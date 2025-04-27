import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import EchallanQuerySerializer, ForgotPasswordEmailSerializer, ResetPasswordSerializer, UserLoginSerializer, UserRegistrationSerializer, CustomTokenObtainPairSerializer, EchallanSerializer, VerifyOTPSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Echallan_main, EchallanQuery, OTPVerification, ResolutionStatus, User, Vehicle
import json
from roboflow import Roboflow
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
import numpy as np
import cv2
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password,make_password


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
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            print(email, password)
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({
                    'error': 'No account found with this email'
                }, status=status.HTTP_404_NOT_FOUND)
            print(user.password)
            print(make_password(password))
            if not check_password(password,user.password):
                return Response({
                    'error': 'Invalid credentials'
                }, status=status.HTTP_401_UNAUTHORIZED)

            if hasattr(user, 'is_deleted') and user.is_deleted:
                return Response({
                    'error': 'This account has been deleted'
                }, status=status.HTTP_403_FORBIDDEN)

            refresh = RefreshToken.for_user(user)

            return Response({
                'message': 'Login successful',
                'role': user.role,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                "user": {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class EchallanListCreateView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        """Get all challans with optional filtering"""
        try:
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
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"An error occurred while retrieving challans: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        """Create new challan"""
        try:
            serializer = EchallanSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({"error": "Invalid data", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": f"An error occurred while creating the challan: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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


@csrf_exempt
def detect_characters(request):
    rf = Roboflow(api_key="EegbMxRcwWYzCAaMz1sG")
    project = rf.workspace("number-plate-infqe").project("anprind")
    model = project.version(1).model

    if request.method == 'POST':
        if 'image' not in request.FILES:
            return JsonResponse({'error': 'No image file provided'}, status=400)

        image_file = request.FILES['image']

        try:
            # Read the image file
            image_bytes = image_file.read()

            # Convert image bytes to a NumPy array
            image_np = np.frombuffer(image_bytes, np.uint8)
            frame = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

            if frame is None:
                return JsonResponse({'error': 'Invalid image file'}, status=400)

            # Run inference using the Roboflow API
            result = model.predict(frame).json()

            # Extract detected characters
            predictions = result.get('predictions', [])
            sorted_predictions = sorted(predictions, key=lambda p: (
                p['x'] + p['width'] / 2, p['y'] + p['height'] / 2))

            # Extract detected characters in the sorted order
            detected_characters = [p['class'] for p in sorted_predictions]

            return JsonResponse({'detected_characters': detected_characters})

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
        print(data)
        serializer = EchallanSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
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
            except User.DoesNotExist:   
                return Response({
                    'error': 'User with this email does not exist'
                }, status=status.HTTP_404_NOT_FOUND)

            try:
                otp_obj = OTPVerification.objects.filter(
                    user=user,
                    otp=otp,
                    is_used=False
                ).latest('created_at')
            except OTPVerification.DoesNotExist:
                return Response({
                    'error': 'Invalid or expired OTP'
                }, status=status.HTTP_400_BAD_REQUEST)

            if not otp_obj.is_valid():
                return Response({
                    'error': 'OTP has expired'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Mark OTP as used
            otp_obj.is_used = True
            otp_obj.save()

            # Generate tokens
            refresh = RefreshToken.for_user(user)

            return Response({
                'message': 'OTP verified successfully',
                'role': user.role,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }
            }, status=status.HTTP_200_OK)

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


# -------------------------- New Code --------------------------------------


class InitializeResolutionStatusAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        statuses = [
            {"status": "Query Received",
                "description": "The query has been received from the user."},
            {"status": "Verification",
                "description": "Verifying the provided information."},
            {"status": "Processing", "description": "The query is being processed."},
            {"status": "Resolved",
                "description": "The query has been successfully resolved."},
            {"status": "Rejected", "description": "The query was rejected."},
            {"status": "Escalated",
                "description": "The query was escalated to higher authorities."},
            {"status": "On Hold", "description": "The query is temporarily on hold."},
        ]

        for status in statuses:
            ResolutionStatus.objects.get_or_create(status=status["status"], defaults={
                                                   "description": status["description"]})

        return Response({"message": "Resolution statuses initialized successfully."}, status=status.HTTP_201_CREATED)


class EchallanQueryAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, ticket_no=None):
        """
        Retrieve one or all E-Challan Queries.
        """
        if ticket_no:
            query = get_object_or_404(EchallanQuery, ticket_no=ticket_no)
            serializer = EchallanQuerySerializer(query)
        else:
            queries = EchallanQuery.objects.all()
            serializer = EchallanQuerySerializer(queries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            data = request.data
            # Validate related objects
            challan = get_object_or_404(
                Echallan_main, id=data.get("challan_no"))

            # Add explicit debugging for user lookup
            email = data.get("email_address")
            print(f"Looking for user with email: {email}")
            user = get_object_or_404(User, email=email)
            print(f"Found user: {user.id}, {user.email}")

            # Create the query with explicit user assignment
            query = EchallanQuery.objects.create(
                echallan=challan,
                user=user,  # Make sure this field name matches your model
                query_description=data.get("query_description", ""),
                issue_type=data.get("issue_type"),
                document_url=data.get("document_url"),
                resolution_status=get_object_or_404(
                    ResolutionStatus, status="Query Received"),
            )

            # Double-check the created object
            print(
                f"Created query with user: {query.user.id if query.user else 'None'}")

            return Response(
                {"message": "Query created successfully.",
                    "ticket_no": query.ticket_no},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            # Log any exceptions
            print(f"Error creating query: {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def put(self, request, ticket_no):
        """
        Update an existing E-Challan Query.
        """
        query = get_object_or_404(EchallanQuery, ticket_no=ticket_no)
        data = request.data

        query.query_description = data.get(
            "query_description", query.query_description)
        query.issue_type = data.get("issue_type", query.issue_type)
        query.resolution_status = get_object_or_404(
            ResolutionStatus, status=data.get(
                "resolution_status", query.resolution_status.status)
        )
        query.document_url = data.get("document_url", query.document_url)
        query.save()

        return Response({"message": "Query updated successfully."}, status=status.HTTP_200_OK)
    
    
    def patch(self, request, ticket_no):
        """
        Partially update the resolution status of an E-Challan Query.
        """
        query = get_object_or_404(EchallanQuery, ticket_no=ticket_no)
        data = request.data

        if "resolution_status" in data:
            query.resolution_status = get_object_or_404(
                ResolutionStatus, status=data["resolution_status"]
            )
            query.save()
            return Response({"message": "Resolution status updated successfully."}, status=status.HTTP_200_OK)

        return Response({"error": "Resolution status is required."}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, ticket_no):
        """
        Delete an E-Challan Query.
        """
        query = get_object_or_404(EchallanQuery, ticket_no=ticket_no)
        query.delete()
        return Response({"message": "Query deleted successfully."}, status=status.HTTP_204_NO_CONTENT)



class PendingChallanAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        # Get the first pending challan
        pending_challan = Echallan_main.objects.filter(status='pending').order_by('id').first()
        
        if not pending_challan:
            return Response({"message": "No pending challans available"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = EchallanSerializer(pending_challan)
        return Response(serializer.data, status=status.HTTP_200_OK)



class UpdateChallanStatusAPIView(APIView):
    permission_classes = [AllowAny]
    def put(self, request, challan_id):
        try:
            challan = Echallan_main.objects.get(id=challan_id)
        except Echallan_main.DoesNotExist:
            return Response({"error": "Challan not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Extract the action from request data
        action = request.data.pop('action', None)
        
        # Update all other fields from request data except date fields and document_url
        updatable_data = {k: v for k, v in request.data.items() 
                         if k not in ['Violation_Date', 'Challan_Date', 'document_url']}
        
        # Update challan data
        for key, value in updatable_data.items():
            setattr(challan, key, value)
        
        # Set status based on action
        if action == 'approve':
            challan.status = 'verified'
            message = "Challan verified successfully"
        elif action == 'reject':
            challan.status = 'rejected'
            message = "Challan rejected successfully"
        else:
            return Response({
                "error": "Invalid action. Use 'approve' or 'reject'"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        challan.save()
        
        return Response({
            "message": message,
            "challan_id": challan_id
        }, status=status.HTTP_200_OK)
        
        

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .models import User, PoliceOfficer
from .serializers import UserProfileSerializer, PoliceOfficerProfileSerializer
class UserProfileView(APIView):
    """
    API View to retrieve, edit, and soft delete user profile information based on user's role
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id, format=None):
        # Get the requested user
        user = get_object_or_404(User, id=user_id, is_deleted=False)

        # Prepare response data based on the user's role
        if user.role == 'PO':  # Police Officer
            try:
                police_officer = PoliceOfficer.objects.get(user=user)

                # Combine user and police officer data
                user_data = UserProfileSerializer(user).data
                police_data = {
                    'badge_number': police_officer.badge_number,
                    'station_name': police_officer.station_name,
                    'assigned_area': police_officer.assigned_area,
                    'status': police_officer.status,
                    'rank': police_officer.rank
                }

                response_data = {**user_data, **police_data}
                return Response(response_data, status=status.HTTP_200_OK)

            except PoliceOfficer.DoesNotExist:
                return Response(
                    {"detail": "Police Officer profile not found."},
                    status=status.HTTP_404_NOT_FOUND
                )
        elif user.role == "USER":
            # For regular users, return only user data
            user_data = UserProfileSerializer(user).data
            return Response(user_data, status=status.HTTP_200_OK)
        elif user.role == 'ADMIN':
            user_data = UserProfileSerializer(user).data
            return Response(user_data, status=status.HTTP_200_OK)

    def patch(self, request, user_id, format=None):
        """
        Partially update user profile information
        """
        
        user = get_object_or_404(User, id=user_id, is_deleted=False)
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            # Reload the user object to ensure updated data is reflected
            user.refresh_from_db()

            # Return the updated user data
            return Response(UserProfileSerializer(user).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def delete(self, request, user_id, format=None):
        """
        Soft delete the user by marking is_deleted as True
        """
        user = get_object_or_404(User, id=user_id, is_deleted=False)
        
        # Soft delete the user without checking permissions
        user.is_deleted = True
        user.save()
        return Response({"message": "User soft deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
