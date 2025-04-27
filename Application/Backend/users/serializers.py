from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Echallan_main, Vehicle, User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'password2', 'role')
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
            password=password,
            **validated_data  # This will include email and other fields
        )
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
    # Add this to handle the Image_url field in incoming data
    Image_url = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = Echallan_main
        fields = '__all__'
        # Add Image_url to the explicitly listed fields if you're not using '__all__'
        # fields = [..., 'document_url', 'Image_url']
        
    def create(self, validated_data):
        # Make sure Image_url gets mapped to document_url during creation
        if 'Image_url' in validated_data:
            validated_data['document_url'] = validated_data.pop('Image_url')
        return super().create(validated_data)
        
    def validate(self, data):
        # Convert ViolationType to lowercase
        if 'ViolationType' in data:
            data['ViolationType'] = data['ViolationType'].lower()

        # Explicitly map Image_url to document_url
        if 'Image_url' in data:
            data['document_url'] = data.pop('Image_url')

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
