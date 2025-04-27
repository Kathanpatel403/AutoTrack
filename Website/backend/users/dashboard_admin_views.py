import datetime
import random
import string
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework.generics import CreateAPIView
from .serializers import EchallanVerificationSerializer, UserRegistrationSerializer
from .serializers import EchallanLimitedSerializer
from .models import Echallan_main, ResolutionStatus
from rest_framework.generics import ListAPIView
from .serializers import AddPoliceOfficerSerializer
from .models import PoliceOfficer
from .serializers import (
    UserWithPoliceSerializer,
    StatusUpdateSerializer,
    RoleUpdateSerializer
)
from .models import User, PoliceOfficer
from rest_framework import generics, status
from .models import EchallanVerification
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Sum, Count
from .models import Payment, Echallan_main,EchallanQuery, PoliceOfficer, ResolutionStatus, User
from .models import Payment, Echallan_main, EchallanQuery, PoliceOfficer, User
from django.http import JsonResponse
from .serializers import EchallanFullSerializer, EchallanQueryListSerializer, EchallanQuerySerializer, PoliceOfficerSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from .models import EchallanQuery
from .serializers import EchallanQuerySerializer
from django.utils import timezone
from django.db import transaction
import datetime
from django.db import transaction
from django.apps import apps
from django.db import connection


class TotalPaymentAmountView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        total_amount = Payment.objects.aggregate(
            total=Sum('amount'))['total'] or 0
        return JsonResponse({'total_amount': total_amount})


class TotalEchallanCountView(RetrieveAPIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        total_echallan_count = Echallan_main.objects.count()
        return JsonResponse({'total_echallan_count': total_echallan_count})


class TotalIssuedSolvedEchallanCountView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        total_issued_solved_echallan_count = EchallanQuery.objects.filter(
            resolution_status_id=2).count()
        return Response({'total_issued_solved_echallan_count': total_issued_solved_echallan_count})


class PaidEchallanCountView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        paid_count = Payment.objects.count()
        return Response({'paid_echallan_count': paid_count})


class MostCommonViolationTypeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        most_violation_type = Echallan_main.objects.values('ViolationType').annotate(
            count=Count('ViolationType')).order_by('-count').first()

        return Response({
            'most_violation_type': most_violation_type
        })


class MostCommonViolationPlaceView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        most_violation_place = Echallan_main.objects.values('Place_Of_Violation').annotate(
            count=Count('Place_Of_Violation')).order_by('-count').first()

        return Response({
            'most_violation_type': most_violation_place
        })


class MostCommonViolationVehicleClassView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        most_vehicle_class = Echallan_main.objects.values('Vehicle_Class').annotate(
            count=Count('Vehicle_Class')).order_by('-count').first()

        return Response({
            'most_violation_type': most_vehicle_class
        })


class EchallanQueryListCreateView(ListCreateAPIView):
    queryset = EchallanQuery.objects.all()
    serializer_class = EchallanQuerySerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        request.data['resolution_details'] = request.data.get(
            'resolution_details', "Your application is under process.")
        request.data['user'] = request.user.id  # Pass the user as request.user
        print("Received Data:", request.data)  # Debugging
        return super().create(request, *args, **kwargs)


# API to retrieve, update, and delete e-challan queries


class EchallanQueryDetailView(RetrieveAPIView):
    serializer_class = EchallanQuerySerializer
    lookup_field = 'ticket_no'  # Search by ticket number
    permission_classes = [AllowAny]

    def get_queryset(self):
        return EchallanQuery.objects.all()

    def get(self, request, *args, **kwargs):
        ticket_no = self.kwargs.get('ticket_no')
        try:
            query = EchallanQuery.objects.get(ticket_no=ticket_no)
            serializer = self.get_serializer(query)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except EchallanQuery.DoesNotExist:
            return Response({'error': 'Query not found'}, status=status.HTTP_404_NOT_FOUND)


class EchallanCreateView(generics.CreateAPIView):
    queryset = EchallanVerification.objects.all()
    serializer_class = EchallanVerificationSerializer
    permission_classes = [AllowAny]  # Only logged-in users can create


class EchallanRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = EchallanVerification.objects.all()
    serializer_class = EchallanVerificationSerializer
    permission_classes = [AllowAny]  # Only logged-in users can update

    def perform_update(self, serializer):
        serializer.save()


# Fetch all users with their police details (if applicable)

class UserWithPoliceListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserWithPoliceSerializer

    def get_queryset(self):
        return User.objects.filter(
            role__in=['ADMIN', 'MANAGER', 'PO']
        ).order_by('-id')

# Update status of a Police Officer


class UpdatePoliceStatusView(APIView):
    permission_classes = [AllowAny]

    def patch(self, request, id):
        try:
            police_officer = PoliceOfficer.objects.get(user=id)
            serializer = StatusUpdateSerializer(
                police_officer, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Status updated successfully"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except PoliceOfficer.DoesNotExist:
            return Response({"error": "Police Officer not found"}, status=status.HTTP_404_NOT_FOUND)

# Update user role


class UpdateUserRoleView(APIView):
    permission_classes = [AllowAny]

    def patch(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            serializer = RoleUpdateSerializer(
                user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Role updated successfully"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


class AddPoliceOfficerView(CreateAPIView):
    queryset = PoliceOfficer.objects.all()
    serializer_class = AddPoliceOfficerSerializer
    permission_classes = [AllowAny]

    

    def send_welcome_email(self, email, password):
        """Send a welcome email with the generated password"""
        subject = "Welcome to the Police Department"
        message = f"Dear Officer,\n\nWelcome to the Police Department. Your account has been created successfully.\n\nYour login credentials are:\nEmail: {email}\nPassword: {password}\n\nPlease change your password after logging in.\n\nBest regards,\nAdmin Team"
        from_email = "admin@policedepartment.com"  # Replace with your sender email
        send_mail(subject, message, from_email, [email])

    def create(self, request, *args, **kwargs):
        """Custom error handling for user & police officer creation"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
           
            # Save the police officer
            police_officer,password = serializer.save()
            print(password)
            # Send the welcome email
            self.send_welcome_email(police_officer.user.email, password)
            return Response({"message": "Police Officer added successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EchallanLimitedView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Echallan_main.objects.all().order_by("-Challan_Date")
    serializer_class = EchallanLimitedSerializer


class EchallanDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        try:
            echallan = Echallan_main.objects.get(id=id)
            serializer = EchallanFullSerializer(echallan)
            return Response(serializer.data)
        except Echallan_main.DoesNotExist:
            return Response({"error": "Echallan not found"}, status=404)


class EchallanQueryListView(generics.ListAPIView):
    queryset = EchallanQuery.objects.all().order_by('-query_date')
    serializer_class = EchallanQueryListSerializer
    permission_classes = [AllowAny]
    serializer_class = EchallanQueryListSerializer
    
    

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import EchallanQuery, ResolutionStatus
from .serializers import EchallanQuerySerializer

class UpdateEchallanStatusView(APIView):
    permission_classes = [AllowAny]
    def patch(self, request, pk):
        echallan = get_object_or_404(EchallanQuery, id=pk)
        resolution_status_label = request.data.get("resolution_status")  # Expecting "Approved" or "Rejected"

        # Ensure valid resolution status
        resolution_status = ResolutionStatus.objects.filter(status=resolution_status_label).first()
        if not resolution_status:
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

        # Assign the resolution status correctly
        echallan.resolution_status = resolution_status
        if resolution_status == 2 :
            echallan.resolution_details = "Resolved successfully."
        elif resolution_status == 1:
            echallan.resolution_details = "Your application is under process."
        elif resolution_status == 3:
            echallan.resolution_details = "Your application is rejected."
        echallan.resolved_at = timezone.now()
        echallan.save()
        

        return Response({"message": "Status updated successfully"}, status=status.HTTP_200_OK)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status as http_status
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from .models import EchallanVerification,User
from .serializers import EchallanVerificationSerializer


class UpdateEchallanVerificationStatus(APIView):
    permission_classes = [AllowAny]
    def patch(self, request, pk):
        challan = get_object_or_404(EchallanVerification, id=pk)
        
        new_status = request.data.get("status")  # Expected "verified" or "rejected"
        user_id = request.data.get("verified_by")  # Pass user ID to track who verified

        # Validate the status
        if new_status not in ["verified", "rejected"]:
            return Response({"error": "Invalid status"}, status=http_status.HTTP_400_BAD_REQUEST)

        # Assign the status and verification details
        challan.status = new_status
        challan.verified_at = now()

        # Assign verified_by user if provided
        if user_id:
            user = User.objects.filter(id=user_id).first()
            if user:
                challan.verified_by = user
            else:
                return Response({"error": "Invalid user ID"}, status=http_status.HTTP_400_BAD_REQUEST)

        challan.save()

        return Response({"message": f"Challan {new_status} successfully"}, status=http_status.HTTP_200_OK)

    def get_queryset(self):
        # Filter to only get queries that need verification (resolution_status.id = 5)
        return EchallanQuery.objects.filter(resolution_status_id=1)


class EchallanVerificationAPIView(APIView):
    permission_classes = []

    def post(self, request, format=None):
        try:
            data = request.data
            challan_id = data.get('challan_id')
            verification_status = data.get(
                'status')  # 'verified' or 'rejected'
            # Get admin ID from request data instead
            admin_id = data.get('admin_id')

            # Validate input data
            if not challan_id or not verification_status:
                return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

            if verification_status not in ['verified', 'rejected']:
                return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

            # Get the challan query
            try:
                challan_query = EchallanQuery.objects.get(id=challan_id)
            except EchallanQuery.DoesNotExist:
                return Response({'error': 'E-Challan query not found'}, status=status.HTTP_404_NOT_FOUND)

            # Get admin user if admin_id is provided
            admin_user = None
            if admin_id:
                try:
                    admin_user = User.objects.get(id=admin_id)
                except User.DoesNotExist:
                    # Continue without a user if not found
                    pass

            # Set the appropriate resolution status ID
            # 4 for verified, 5 for rejected
            status_id = 4 if verification_status == 'verified' else 5

            try:
                resolution_status = ResolutionStatus.objects.get(id=status_id)
                challan_query.resolution_status = resolution_status
                if admin_user:
                    challan_query.resolved_by = admin_user
                challan_query.resolved_at = timezone.now()
                challan_query.resolution_details = f"Verification {verification_status}" + (
                    f" by {admin_user.email}" if admin_user else "")
                challan_query.save()
            except ResolutionStatus.DoesNotExist:
                return Response({'error': 'Resolution status not found'}, status=status.HTTP_404_NOT_FOUND)

            # If approved, create a new EchallanVerification entry
            if verification_status == 'verified' and challan_query.echallan:
                # Get vehicle information from the linked Echallan
                echallan = challan_query.echallan

                # Create new verification record
                verification = EchallanVerification(
                    vehicle_number=echallan.vehicle_number if hasattr(
                        echallan, 'vehicle_number') else "Unknown",
                    violated_rule=echallan.violation_type if hasattr(
                        echallan, 'violation_type') else "Unknown",
                    status='verified',
                    echallan_status='generated',
                    # Assuming the echallan has proof images - adjust as needed
                    proof_image1=echallan.proof_image1 if hasattr(
                        echallan, 'proof_image1') else None,
                    proof_image2=echallan.proof_image2 if hasattr(
                        echallan, 'proof_image2') else None,
                    verified_by=admin_user,  # This can be None
                    verified_at=timezone.now()
                )
                verification.save()

            return Response({
                'success': True,
                'message': f'E-Challan {verification_status} successfully',
                'challan_id': challan_id
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PopulatePoliceOfficersView(APIView):
    """API to populate Police Officer records from existing User records with 'PO' role"""
    permission_classes = [
        AllowAny]  # Only admin users can access this endpoint

    def post(self, request):
        # Station names and assigned areas
        LOCATIONS = ['infocity', 'sargasan', 'bapunagar',
                     'kudasan', 'naroda', 'nikol', 'navrangpura']

        # Random ranks to assign
        RANKS = ['Inspector', 'Sub-Inspector', 'Head Constable',
                 'Constable', 'Assistant Commissioner', 'Deputy Commissioner']

        try:
            with transaction.atomic():
                # Get all users with role PO (Police Officer) that don't have PoliceOfficer records
                police_users = User.objects.filter(
                    role='PO').exclude(police_officer__isnull=False)

                created_records = []
                for user in police_users:
                    # Generate random data
                    badge_number = f"{random.choice(['GJ', 'AHD', 'PO'])}-{random.randint(10000, 99999)}"
                    station_name = random.choice(LOCATIONS)
                    assigned_area = random.choice(LOCATIONS)
                    rank = random.choice(RANKS)

                    # Create the new police officer record
                    officer = PoliceOfficer.objects.create(
                        user=user,
                        badge_number=badge_number,
                        station_name=station_name,
                        assigned_area=assigned_area,
                        status=True,  # Active status
                        rank=rank
                    )

                    created_records.append({
                        'email': user.email,
                        'badge_number': badge_number,
                        'station_name': station_name,
                        'assigned_area': assigned_area,
                        'rank': rank
                    })

                return Response({
                    'success': True,
                    'message': f"Successfully created {len(created_records)} police officer records",
                    'created_records': created_records
                }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'success': False,
                'message': f"Error populating police officer records: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GeneratePaymentDataView(APIView):
    """API to generate and insert payment data for existing echallans"""
    permission_classes = [
        AllowAny]  # Only admin users can access this endpoint

    def generate_transaction_id(self):
        """Generate a unique transaction ID"""
        prefix = random.choice(['TXN', 'PAY', 'INV'])
        random_part = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=12))
        return f"{prefix}-{random_part}"

    def post(self, request):
        """Create payment records for existing echallans"""
        try:
            # Get parameters from request or use defaults
            payment_count = int(request.data.get(
                'payment_count', 100))  # Default 100 payments
            min_amount = float(request.data.get('min_amount', 100.00))
            max_amount = float(request.data.get('max_amount', 5000.00))

            with transaction.atomic():
                # Get existing echallan IDs that don't have payments
                existing_payment_echallan_ids = Payment.objects.values_list(
                    'e_challan_id', flat=True)
                available_echallans = Echallan_main.objects.exclude(
                    id__in=existing_payment_echallan_ids
                )[:payment_count]

                # Get all users to randomly assign as payers
                users = list(User.objects.all())

                if not available_echallans:
                    return Response({
                        'success': False,
                        'message': "No available echallans without payments found"
                    }, status=status.HTTP_400_BAD_REQUEST)

                created_payments = []
                for echallan in available_echallans:
                    # Generate random payment data
                    amount = round(random.uniform(min_amount, max_amount), 2)
                    paid_by = random.choice(users)
                    transaction_id = self.generate_transaction_id()

                    # Create payment record with auto_now_add=True for payment_date
                    payment = Payment.objects.create(
                        e_challan=echallan,
                        paid_by=paid_by,
                        amount=amount,
                        transaction_id=transaction_id
                    )

                    created_payments.append({
                        'id': payment.id,
                        'echallan_id': echallan.id,
                        'paid_by': paid_by.email,
                        'amount': float(amount),
                        'payment_date': payment.payment_date.isoformat(),
                        'transaction_id': transaction_id
                    })

                return Response({
                    'success': True,
                    'message': f"Successfully created {len(created_payments)} payment records",
                    'count': len(created_payments),
                    # Return only first 10 to avoid overwhelming response
                    'payments': created_payments[:10]
                }, status=status.HTTP_201_CREATED)

        except Exception as e:
            import traceback

            return Response({
                'success': False,
                'message': f"Error generating payment data: {str(e)}",
                'traceback': traceback.format_exc()
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DashboardStatsAPIView(APIView):
    """API View to get dashboard statistics"""
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            # Get total challans issued
            total_challans = Echallan_main.objects.count()

            # Get total amount collected
            total_amount = Echallan_main.objects.aggregate(
                total=Sum('FineAmount'))['total'] or 0

            # Get payment compliance rate
            paid_challans_count = Payment.objects.values(
                'e_challan_id').distinct().count()
            compliance_rate = round(
                (paid_challans_count / total_challans) * 100) if total_challans > 0 else 0

            # Get pending challans (those not in Payments table)
            paid_challans_ids = Payment.objects.values_list(
                'e_challan_id', flat=True).distinct()
            pending_challans = Echallan_main.objects.exclude(
                id__in=paid_challans_ids).count()

            # Calculate percentage increases (comparing with previous month)
            current_date = timezone.now()
            previous_month = current_date - datetime.timedelta(days=30)

            # Filter for previous month's data
            previous_month_challans = Echallan_main.objects.filter(
                Challan_Date__lt=previous_month.date()).count()
            previous_month_amount = Echallan_main.objects.filter(
                Challan_Date__lt=previous_month.date()).aggregate(total=Sum('FineAmount'))['total'] or 0
            previous_compliance = Payment.objects.filter(
                payment_date__lt=previous_month).values('e_challan_id').distinct().count()
            previous_compliance_rate = round(
                (previous_compliance / previous_month_challans) * 100) if previous_month_challans > 0 else 0
            previous_pending = Echallan_main.objects.filter(Challan_Date__lt=previous_month.date()).exclude(
                id__in=Payment.objects.filter(payment_date__lt=previous_month).values_list('e_challan_id', flat=True)).count()

            # Calculate percentage increases
            challans_increase = round(((total_challans - previous_month_challans) /
                                      previous_month_challans) * 100) if previous_month_challans > 0 else 0
            amount_increase = round(((total_amount - previous_month_amount) /
                                    previous_month_amount) * 100) if previous_month_amount > 0 else 0
            compliance_increase = compliance_rate - previous_compliance_rate
            pending_increase = round(
                ((pending_challans - previous_pending) / previous_pending) * 100) if previous_pending > 0 else 0

            return Response({
                'total_challans': total_challans,
                'total_amount': total_amount,
                'compliance_rate': compliance_rate,
                'pending_challans': pending_challans,
                'challans_increase': f"+{challans_increase}%" if challans_increase > 0 else f"{challans_increase}%",
                'amount_increase': f"+{amount_increase}%" if amount_increase > 0 else f"{amount_increase}%",
                'compliance_increase': f"+{compliance_increase}%" if compliance_increase > 0 else f"{compliance_increase}%",
                'pending_increase': f"+{pending_increase}%" if pending_increase > 0 else f"{pending_increase}%",
            })
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RevenueChartAPIView(APIView):
    """API View to get revenue data for chart"""
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            # Get monthly revenue data for the last 6 months
            current_date = timezone.now()

            # Prepare data containers
            months_data = []
            labels = []

            for i in range(5, -1, -1):
                month_start = (current_date - datetime.timedelta(days=30 * i)
                               ).replace(day=1, hour=0, minute=0, second=0)
                month_end = (month_start.replace(month=month_start.month+1) if month_start.month < 12
                             else month_start.replace(year=month_start.year+1, month=1)) - datetime.timedelta(seconds=1)

                month_name = month_start.strftime('%b')
                labels.append(month_name)

                # Use the correct field name 'FineAmount' and filter by 'Challan_Date'
                month_revenue = Echallan_main.objects.filter(
                    Challan_Date__gte=month_start.date(),
                    Challan_Date__lte=month_end.date()
                ).aggregate(total=Sum('FineAmount'))['total'] or 0

                months_data.append(month_revenue)

            return Response({
                'labels': labels,
                'data': months_data
            })
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RecentChallansAPIView(APIView):
    """API View to get recent challans"""
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            # Use the correct field names from the Echallan_main model
            recent_challans = Echallan_main.objects.order_by('-Challan_Date')[:10].values(
                'id', 'Vehicle_No', 'Owner_First_Name', 'Owner_Last_Name', 'Challan_Date', 'FineAmount'
            )

            # Convert to list and format dates
            challans_list = list(recent_challans)
            for challan in challans_list:
                # Add full owner name for convenience
                challan['owner_name'] = f"{challan['Owner_First_Name']} {challan['Owner_Last_Name']}"
                # Format date
                challan['challan_date'] = challan['Challan_Date'].strftime(
                    '%d %b %Y')
                # Rename fields to keep API response consistent
                challan['vehicle_number'] = challan.pop('Vehicle_No')
                challan['created_at'] = challan.pop('challan_date')
                challan['fineamount'] = challan.pop('FineAmount')
                # Remove original name fields to avoid duplication
                challan.pop('Owner_First_Name')
                challan.pop('Owner_Last_Name')
                challan.pop('Challan_Date')

            return Response(challans_list)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


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
        print("violations: ", daily_challans[::-1])
        return Response({'violations': daily_challans[::-1]})
