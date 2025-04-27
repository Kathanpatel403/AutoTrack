import random
import string
from .models import PoliceOfficer, User
from .models import Echallan_main, Vehicle
from .models import Echallan_main
from .models import User, PoliceOfficer
from .models import EchallanVerification
from datetime import timezone
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Echallan_main, EchallanQuery, PoliceOfficer, Vehicle, User, ResolutionStatus
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from rest_framework import serializers


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'password2', 'role','first_name', 'last_name')
        extra_kwargs = {
            'email': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        # Remove password2 and password from validated_data
        validated_data.pop('password2')
        password = validated_data.pop('password')

        # Create user instance
        user = User.objects.create_user(
        email=validated_data.get('email'),
        password=password,  # Just pass the plain password, create_user handles hashing
    )
    
    # Set other fields after user creation
        user.first_name = validated_data.get('first_name', '')
        user.last_name = validated_data.get('last_name', '')
        user.role = "USER"  # Default role
        user.is_active = True  # Set the user as active by default
        user.save()

        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['role'] = user.role

        return token


class EchallanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Echallan_main
        fields = '__all__'

    def validate(self, data):
        # Validate if vehicle exists when creating/updating challan
        vehicle_no = data.get('Vehicle_No')
        try:
            # Get the most recently registered vehicle in case of duplicates
            vehicle = Vehicle.objects.filter(
                License_Plate_No=vehicle_no,
                Is_Active=True
            ).order_by('-Registration_Date').first()

            if not vehicle:
                raise serializers.ValidationError(
                    f"No active vehicle found with number {vehicle_no}")

            data['vehicle'] = vehicle

            # Optionally, you can auto-fill some fields from the vehicle data
            if vehicle:
                data['Vehicle_Class'] = data.get(
                    'Vehicle_Class') or vehicle.Vehicle_Class
                data['Chassis_No'] = data.get(
                    'Chassis_No') or vehicle.Chassis_No
                data['Engine_No'] = data.get('Engine_No') or vehicle.Engine_No
                data['Make_Model'] = data.get(
                    'Make_Model') or vehicle.Make_Model
                data['Owner_First_Name'] = data.get(
                    'Owner_First_Name') or vehicle.First_Name
                data['Owner_Last_Name'] = data.get(
                    'Owner_Last_Name') or vehicle.Last_Name

        except Exception as e:
            raise serializers.ValidationError(
                f"Error validating vehicle: {str(e)}")

        return data


class ForgotPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()


class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(write_only=True)


class ResolutionStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResolutionStatus
        fields = '__all__'


class EchallanQuerySerializer(serializers.ModelSerializer):
    # Accept challan number from frontend
    challan_no = serializers.IntegerField(write_only=True)
    email_address = serializers.EmailField(
        write_only=True)  # Accept email from frontend

    class Meta:
        model = EchallanQuery
        fields = '__all__'
        # Mark as read-only since we'll set them manually
        read_only_fields = ['user', 'echallan']

    def create(self, validated_data):
        # Handle challan number
        challan_no = validated_data.pop('challan_no', None)
        if challan_no:
            try:
                validated_data['echallan'] = Echallan_main.objects.get(
                    id=challan_no)
            except Echallan_main.DoesNotExist:
                raise serializers.ValidationError(
                    {"challan_no": "Invalid Challan Number"})

        # Handle email address
        email_address = validated_data.pop('email_address', None)
        if email_address:
            try:
                validated_data['user'] = User.objects.get(email=email_address)
            except User.DoesNotExist:
                raise serializers.ValidationError(
                    {"email_address": "User with this email does not exist"})

        return super().create(validated_data)


class EchallanVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EchallanVerification
        fields = ['id', 'vehicle_number', 'violated_rule', 'status',
                  'proof_image1', 'proof_image2', 'verified_by', 'verified_at']
        # Cannot be modified by users
        read_only_fields = ['verified_by', 'verified_at']

    def update(self, instance, validated_data):
        request = self.context.get('request')
        user = request.user if request else None  # Get the current user

        instance.vehicle_number = validated_data.get(
            'vehicle_number', instance.vehicle_number)
        instance.violated_rule = validated_data.get(
            'violated_rule', instance.violated_rule)
        instance.status = validated_data.get('status', instance.status)

        # Update images if new ones are provided
        if 'proof_image1' in validated_data:
            instance.proof_image1 = validated_data['proof_image1']
        if 'proof_image2' in validated_data:
            instance.proof_image2 = validated_data['proof_image2']

        # Auto-update verification details if verified
        if user and user.role == 'ADMIN' and instance.status == 'verified':
            instance.verified_by = user
            instance.verified_at = timezone.now()

        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'role']


class PoliceOfficerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = PoliceOfficer
        fields = ['first_name', 'last_name', 'email', 'contact_number',
                  'address_1', 'address_2', 'badge_number', 'rank', "user"]


class UserWithPoliceSerializer(serializers.ModelSerializer):
    """Serializer to combine User and PoliceOfficer details"""
    badge_number = serializers.CharField(
        source='police_officer.badge_number', allow_null=True)
    rank = serializers.CharField(source='police_officer.rank', allow_null=True)
    status = serializers.BooleanField(
        source='police_officer.status', allow_null=True)
    assigned_area = serializers.CharField(
        source='police_officer.assigned_area', allow_null=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'role', 'badge_number', 'rank', 'status',"assigned_area"]


class StatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliceOfficer
        fields = ['status']


class RoleUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['role']


class AddPoliceOfficerSerializer(serializers.ModelSerializer):
    # Accept email from frontend
    email = serializers.EmailField(write_only=True)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    contact = serializers.CharField(write_only=True)

    
    
    
    class Meta:
        model = PoliceOfficer
        fields = ['email', 'first_name', 'last_name', 'contact',
                  'badge_number', 'station_name', 'assigned_area', 'rank']
        
    def generate_random_password(self,length=8):
        """Generate a random password"""
        characters = string.ascii_letters + string.digits + string.punctuation
        return ''.join(random.choices(characters, k=length))
    def create(self, validated_data):
        """Create User & Police Officer"""
        email = validated_data.pop('email')
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        contact = validated_data.pop('contact')
        # Generate a random password
        password = self.generate_random_password()
        # Create User with role "PO"
        user = User.objects.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            is_active=True,
            role='PO',
              # Hash the password
        )
        user.password = make_password(password)
        user.save()
        # Create Police Officer entry
        police_officer = PoliceOfficer.objects.create(
            user=user,
            badge_number=validated_data['badge_number'],
            rank=validated_data['rank'],
            assigned_area = validated_data['assigned_area'],
            station_name = validated_data['station_name'],  
            status=True,
        )

        return (police_officer,password)


class EchallanLimitedSerializer(serializers.ModelSerializer):
    payed = serializers.SerializerMethodField()

    def get_payed(self, obj):
            return hasattr(obj, 'payment')
    class Meta:
        model = Echallan_main
        fields = ['id', 'Vehicle_No', 'FineAmount', 'ViolationType', 'Challan_Date',"payed"]


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'  # Fetch all fields from the Vehicle model


class EchallanFullSerializer(serializers.ModelSerializer):
    vehicle_details = VehicleSerializer(
        source="vehicle", read_only=True)  # Fetch related Vehicle details

    class Meta:
        model = Echallan_main
        fields = '__all__'  # Fetch all e-challan fields + vehicle details


class EchallanQueryListSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    license = serializers.SerializerMethodField()
    resolution_status = serializers.CharField(
        source='resolution_status.status', read_only=True)

    class Meta:
        model = EchallanQuery
        fields = ["id",'ticket_no', 'name', 'license', 'query_date', 'issue_type','query_description','document_url', 'resolution_status']
    def get_name(self, obj):
        if obj.echallan and obj.echallan.Owner_First_Name and obj.echallan.Owner_Last_Name:
            return f"{obj.echallan.Owner_First_Name} {obj.echallan.Owner_Last_Name}"
        return "N/A"

    def get_license(self, obj):
        if obj.echallan and obj.echallan.Driving_license_No:
            return obj.echallan.Driving_license_No
        return "N/A"
    

from rest_framework import serializers
from .models import EchallanQuery

class EchallanQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = EchallanQuery
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['user'] = request.user
        return super().create(validated_data)



class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for the User model"""
    
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'role', 'created_at', 'is_active']
        read_only_fields = ['id', 'created_at']

class PoliceOfficerProfileSerializer(serializers.ModelSerializer):
    """Serializer for the PoliceOfficer model with user details"""
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    role = serializers.CharField(source='user.role', read_only=True)
    is_active = serializers.BooleanField(source='user.is_active', read_only=True)
    
    class Meta:
        model = PoliceOfficer
        fields = ['email', 'first_name', 'last_name', 'role', 'is_active', 
                  'badge_number', 'station_name', 'assigned_area', 'status', 'rank']