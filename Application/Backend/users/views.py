import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import ForgotPasswordEmailSerializer, ResetPasswordSerializer, UserLoginSerializer, UserRegistrationSerializer, CustomTokenObtainPairSerializer, EchallanSerializer, VerifyOTPSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Echallan_main, OTPVerification, User, Vehicle
import json
from roboflow import Roboflow
from django.db.models import Count, Sum
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from django.db.models.functions import TruncWeek, TruncMonth
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes


class UserRegistrationView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            return Response({
                'message': 'User registered successfully',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'role': user.role
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)

            if user is not None:
                if user.is_deleted:
                    return Response({
                        'error': 'This account has been deleted'
                    }, status=status.HTTP_403_FORBIDDEN)

                refresh = RefreshToken.for_user(user)

                return Response({
                    'message': 'Login successful',
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'role': user.role
                    },
                    'tokens': {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }
                })
            else:
                return Response({
                    'error': 'Invalid credentials'
                }, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class EchallanListCreateView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        """Get all challans with optional filtering"""
        queryset = Echallan_main.objects.all()

        # Filter by vehicle number if provided
        vehicle_no = request.query_params.get('vehicle_no', None)
        if vehicle_no:
            queryset = queryset.filter(Vehicle_No=vehicle_no)

        # Filter by date range if provided
        start_date = request.query_params.get('start_date', None)
        end_date = request.query_params.get('end_date', None)
        if start_date and end_date:
            queryset = queryset.filter(Violation_Date__range=[
                start_date, end_date])

        serializer = EchallanSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Create new challan"""
        serializer = EchallanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EchallanDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        """Get specific challan by ID"""
        challan = get_object_or_404(Echallan_main, pk=pk)
        serializer = EchallanSerializer(challan)
        return Response(serializer.data)

    def put(self, request, pk):
        """Full update of existing challan"""
        challan = get_object_or_404(Echallan_main, pk=pk)
        serializer = EchallanSerializer(challan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        """Partial update of challan"""
        challan = get_object_or_404(Echallan_main, pk=pk)
        serializer = EchallanSerializer(
            challan, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Delete challan"""
        challan = get_object_or_404(Echallan_main, pk=pk)
        challan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EchallanCreateInOfflineView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            # Parse the request body
            data = json.loads(request.body)

            # Get license plate number from request
            license_plate_no = data.get('License_plate_no')

            if license_plate_no:
                license_plate_no = license_plate_no.upper()
            print(license_plate_no)

            if not license_plate_no:
                return JsonResponse({'error': 'License plate number is required'}, status=400)

            # Fetch vehicle details from the Vehicle table
            try:
                # vehicle = Vehicle.objects.get(
                #     License_Plate_No=license_plate_no)
                vehicle = Vehicle.objects.filter(
                    License_Plate_No=license_plate_no).first()
            except Vehicle.DoesNotExist:
                return JsonResponse({'error': f'Vehicle with license plate {license_plate_no} not found'}, status=404)

            # converting violation type to lowercase:
            violation_type = data.get('ViolationType')
            if violation_type:
                violation_type = violation_type.lower()

            # Create new Echallan object
            echallan = Echallan_main(
                vehicle=vehicle,
                Vehicle_No=license_plate_no,
                Owner_First_Name=vehicle.First_Name,
                Owner_Last_Name=vehicle.Last_Name,
                Vehicle_Class=vehicle.Vehicle_Class,
                Chassis_No=vehicle.Chassis_No,
                Engine_No=vehicle.Engine_No,
                Make_Model=vehicle.Make_Model,
                Violation_Date=datetime.datetime.strptime(
                    data.get('Violation_Date'), '%Y-%m-%d').date(),
                Challan_Date=datetime.datetime.strptime(
                    data.get('Challan_Date'), '%Y-%m-%d').date(),
                Place_Of_Violation=data.get('Place_Of_Violation'),
                Driver_First_Name=data.get('Driver_First_Name'),
                Driver_Last_Name=data.get('Driver_Last_Name'),
                Driving_license_No=data.get('Driving_license_No'),
                Driver_Contact_No=data.get('Driver_Contact_No'),
                Driver_Father_First_Name=data.get('Driver_Father_First_Name'),
                Driver_Father_Last_Name=data.get('Driver_Father_Last_Name'),
                FineAmount=int(data.get('FineAmount')),
                ViolationType=violation_type
            )

            # Save the echallan to the database
            echallan.save()

            # Return success response
            return JsonResponse({
                'status': 'success',
                'message': 'E-Challan created successfully',
                'challan_id': echallan.id,
                'vehicle_details': {
                    'owner_name': f"{vehicle.First_Name} {vehicle.Last_Name}",
                    'vehicle_class': vehicle.Vehicle_Class,
                    'make_model': vehicle.Make_Model
                }
            }, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


def detect_characters(request):
    rf = Roboflow(api_key="EegbMxRcwWYzCAaMz1sG")
    project = rf.workspace("number-plate-infqe").project("anprind")
    model = project.version(1).model
    print("Roboflow model loaded")

    if request.method == 'POST':
        data = json.loads(request.body)
        image_url = data.get('image_url')
        # print("Image fetched from request")

        try:
            # print("Image URL in backend:", image_url)

            # Use the image URL directly for prediction
            # Make a prediction with the URL
            result = model.predict(image_url, hosted=True)
            # print("Got result from Roboflow model")
            # prediction.plot()

            # Convert predictions to JSON
            # ans = prediction.json()
            # print(ans)

            # detected_characters = ''.join(pred['class'] for pred in ans['predictions'])
            # print("Detected Characters:", detected_characters)

            # Extract detected characters
            # print("result:", result)
            # predictions = result.get('predictions', [])
            # print("predictions", predictions)
            sorted_predictions = sorted(result, key=lambda p: (
                p['x'] + p['width'] / 2, p['y'] + p['height'] / 2))
            # print("sorted_predictions", sorted_predictions)
            print("Got predictions from Roboflow.")

            # Extract detected characters in the sorted order
            detected_characters = [p['class'] for p in sorted_predictions]
            # print("Detected characters are: ", detected_characters)

            final_characters = ''.join(detected_characters)
            print("final characters: ", final_characters)
            return JsonResponse({'detected_characters': final_characters})

        except Exception as e:
            print(f'Error detecting characters: {e}')
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


def get_vehicle_record(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            vehicle_no = data.get('vehicle_no', '').strip()

            if not vehicle_no:
                return JsonResponse({'error': 'Missing vehicle number'}, status=400)

            # Retrieve the record based on vehicle number
            record = Vehicle.objects.get(License_Plate_No=vehicle_no)

            # Helper function to handle date fields
            def format_date(date_field):
                return date_field.strftime('%Y-%m-%d') if isinstance(date_field, (datetime.date, datetime.datetime)) else date_field

            # Update response data to include only the required fields
            response_data = {
                'Vehicle_No': record.License_Plate_No,
                'Owner_First_Name': record.First_Name,
                'Owner_Last_Name': record.Last_Name,
                'Vehicle_Class': record.Vehicle_Class,
                'Chassis_No': record.Chassis_No,
                'Engine_No': record.Engine_No,
                'Make_Model': record.Make_Model,
            }
            return JsonResponse({'data': response_data})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Vehicle record not found'}, status=404)
        except Exception as e:
            # Log or handle any other unexpected errors
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST method allowed.'}, status=405)


def save_vehicle_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        # Explicitly map Image_url to document_url
        if 'Image_url' in data:
            data['document_url'] = data['Image_url']
            
        serializer = EchallanSerializer(data=data)
        if serializer.is_valid():
            instance = serializer.save()
            return JsonResponse({"message": "Data saved successfully"}, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


class ForgotPasswordEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgotPasswordEmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)

                # Delete any existing unused OTPs for this user
                OTPVerification.objects.filter(
                    user=user, is_used=False).delete()

                # Generate new OTP
                otp = OTPVerification.generate_otp()
                OTPVerification.objects.create(user=user, otp=otp)

                # Send email
                subject = 'Password Reset OTP'
                message = f'Your OTP for password reset is: {otp}. This OTP will expire in 10 minutes.'
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )

                return Response({
                    'message': 'OTP has been sent to your email'
                }, status=status.HTTP_200_OK)

            except User.DoesNotExist:
                return Response({
                    'error': 'No user found with this email'
                }, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']

            try:
                user = User.objects.get(email=email)
                otp_obj = OTPVerification.objects.filter(
                    user=user,
                    otp=otp,
                    is_used=False
                ).latest('created_at')

                if not otp_obj.is_valid():
                    return Response({
                        'error': 'OTP has expired'
                    }, status=status.HTTP_400_BAD_REQUEST)

                # Mark OTP as used
                otp_obj.is_used = True
                otp_obj.save()
                print("OTP verified successfully!")
                return Response({
                    'message': 'OTP verified successfully'
                }, status=status.HTTP_200_OK)

            except (User.DoesNotExist, OTPVerification.DoesNotExist):
                return Response({
                    'error': 'Invalid OTP'
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            new_password = serializer.validated_data['new_password']

            try:
                user = User.objects.get(email=email)

                # Reset the password
                user.set_password(new_password)
                user.save()

                return Response({
                    'message': 'Password reset successful'
                }, status=status.HTTP_200_OK)

            except User.DoesNotExist:
                return Response({
                    'error': 'User with this email does not exist'
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ViolationTypeCountView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        violation_counts = Echallan_main.objects.values('ViolationType').annotate(
            count=Count('id')
        ).order_by('-count')

        return Response({
            'violation_counts': violation_counts,
            'total_challans': Echallan_main.objects.count()
        })


class WeeklyViolationsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        today = timezone.now().date()
        week_ago = today - timezone.timedelta(days=7)

        # Get challans count for each day
        daily_challans = []
        for i in range(7):
            day = today - timezone.timedelta(days=i)
            count = Echallan_main.objects.filter(Challan_Date=day).count()
            daily_challans.append(count)

        return Response({'violations': daily_challans[::-1]})


class MonthlyViolationsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        today = timezone.now().date()
        monthly_data = Echallan_main.objects.filter(
            Challan_Date__gte=today - timezone.timedelta(days=28)
        ).annotate(week=TruncWeek('Challan_Date')).values('week').annotate(
            count=Count('id')
        ).order_by('week')[:4]

        violations = [entry['count'] for entry in monthly_data]
        while len(violations) < 4:
            violations.append(0)

        return Response({'violations': violations})


class DailyViolationDensityView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        today = timezone.now().date()
        daily_data = Echallan_main.objects.filter(
            Challan_Date__gte=today - timezone.timedelta(days=30)
        ).values('Challan_Date').annotate(count=Count('id')).order_by('Challan_Date')

        violations = [
            {'date': entry['Challan_Date'].strftime(
                '%Y-%m-%d'), 'count': entry['count']}
            for entry in daily_data
        ]

        return Response({'violations': violations})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_today_stats(request):
    today = timezone.now().date()
    challans_today = Echallan_main.objects.filter(Challan_Date=today)

    return Response({
        'challans_issued': challans_today.count(),
        'total_amount': challans_today.aggregate(Sum('FineAmount'))['FineAmount__sum'] or 0,
        'pending_sync': 0  # Implement your sync logic here if needed
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def get_weekly_trend(request):
    # Get challans for last 7 days
    today = timezone.now().date()
    week_ago = today - timezone.timedelta(days=7)

    # Get challans count for each day
    daily_challans = []
    for i in range(7):
        day = today - timezone.timedelta(days=i)
        count = Echallan_main.objects.filter(Challan_Date=day).count()
        daily_challans.append(count)

    return Response({
        # Reverse to match frontend expectation
        'weekly_challans': daily_challans[::-1]
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def get_recent_violations(request):
    recent_violations = Echallan_main.objects.order_by('-id')[:3]

    violations_data = [{
        'id': challan.id,
        'type': challan.ViolationType or 'Unknown',
        'location': challan.Place_Of_Violation,
        'time': challan.Challan_Date.strftime('%Y-%m-%d'),
        'amount': challan.FineAmount or 0,
        'vehicle_no': challan.Vehicle_No
    } for challan in recent_violations]

    return Response(violations_data)
