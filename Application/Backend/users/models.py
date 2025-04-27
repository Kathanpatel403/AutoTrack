from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
import random
from django.core.validators import MinLengthValidator
import datetime



class CustomUserManager(BaseUserManager):
    """Custom user manager for email-based authentication"""

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not False:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)



class User(AbstractUser):
    """Custom User Model with email authentication"""

    username = None
    email = models.EmailField(_('email address'), unique=True)

    ROLE_CHOICES = [
        ('ADMIN', 'Admin'),
        ('MANAGER', 'Manager'),
        ('USER', 'User'),
        ('PO', 'Police Officer')
    ]

    role = models.CharField(
        max_length=20, choices=ROLE_CHOICES, default='USER')
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # Assign the custom manager to the model
    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.created_at = timezone.now()
        if self.is_deleted:
            self.is_active = False
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email



class OTPVerification(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    otp = models.CharField(max_length=6, validators=[MinLengthValidator(6)])
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    @staticmethod
    def generate_otp():
        return str(random.randint(100000, 999999))

    def is_valid(self):
        # OTP expires after 10 minutes
        from django.utils import timezone
        time_difference = timezone.now() - self.created_at
        return time_difference.total_seconds() <= 600 and not self.is_used



class Profile(models.Model):
    details1 = models.CharField(max_length=255)
    details2 = models.CharField(max_length=255)

    class Meta:
        abstract = True



class PostgresModel(models.Model):
    email = models.EmailField(unique=True)
    # For PostgreSQL, we'll need to use JSONField instead of ArrayField for complex data
    profiles = models.JSONField(default=list)

    def __str__(self):
        return self.email



class Person(models.Model):
    id = models.AutoField(primary_key=True)
    Aadhar_Number = models.CharField(max_length=20, unique=True)
    Father_Aadhar_Number = models.CharField(max_length=20, null=True)
    Mother_Aadhar_Number = models.CharField(max_length=20, null=True)
    First_Name = models.CharField(max_length=100)
    Last_Name = models.CharField(max_length=100)
    Date_of_Birth = models.DateField()
    Gender = models.CharField(max_length=10)
    Street = models.CharField(max_length=200)
    Area = models.CharField(max_length=100)
    City = models.CharField(max_length=100)
    State = models.CharField(max_length=100)
    Postal_Code = models.CharField(max_length=20)
    Mobile_Number = models.CharField(max_length=12)
    Email = models.EmailField()
    Enrollment_Date = models.DateField()
    Last_Updated = models.DateField()
    Is_Active = models.BooleanField(default=True)

    class Meta:
        db_table = 'aadharcard'



class Vehicle(models.Model):
    id = models.AutoField(primary_key=True)
    Aadhar_Number = models.ForeignKey(Person, on_delete=models.CASCADE, to_field='Aadhar_Number', db_column='Aadhar_Number')
    First_Name = models.CharField(max_length=100, null=True)
    Last_Name = models.CharField(max_length=100, null=True)
    Policy_No = models.CharField(max_length=100, null=True)
    Provider = models.CharField(max_length=100, null=True)
    Valid_Until = models.DateField(null=True)
    Certificate_No = models.CharField(max_length=100, null=True)
    Street = models.CharField(max_length=200, null=True)
    Area = models.CharField(max_length=100, null=True)
    City = models.CharField(max_length=100, null=True)
    State = models.CharField(max_length=100, null=True)
    Postal_Code = models.CharField(max_length=20, null=True)
    Mobile_Number = models.CharField(max_length=12, null=True)
    Registration_Date = models.DateField(null=True)
    Registration_Expiry = models.DateField(null=True)
    Engine_No = models.CharField(max_length=20, null=True)
    Chassis_No = models.CharField(max_length=20, null=True)
    Engine_Capacity = models.IntegerField(null=True)
    Seating_Capacity = models.IntegerField(null=True)
    Color = models.CharField(max_length=20, null=True)
    Year_of_Manufacture = models.DateField(null=True)
    Make_Model = models.CharField(max_length=50, null=True)
    Vehicle_Class = models.CharField(max_length=50, null=True)
    Vehicle_Type = models.CharField(max_length=50, null=True)
    Fuel_Type = models.CharField(max_length=50, null=True)
    RC_No = models.CharField(max_length=20, null=True)
    License_Plate_No = models.CharField(max_length=20, null=True)
    Is_Active = models.BooleanField(default=True, null=True)

    class Meta:
        db_table = 'vehicle_data'



class Echallan_main(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
    ]

    id = models.AutoField(primary_key=True)
    vehicle = models.ForeignKey(Vehicle, null=True, on_delete=models.SET_NULL)
    Vehicle_No = models.CharField(max_length=255)
    Owner_First_Name = models.CharField(max_length=255)
    Owner_Last_Name = models.CharField(max_length=255)
    Vehicle_Class = models.CharField(max_length=255)
    Chassis_No = models.CharField(max_length=255)
    Engine_No = models.CharField(max_length=255)
    Make_Model = models.CharField(max_length=255)
    Violation_Date = models.DateField()
    Challan_Date = models.DateField()
    Place_Of_Violation = models.TextField()
    Driver_First_Name = models.CharField(max_length=255)
    Driver_Last_Name = models.CharField(max_length=255)
    Driving_license_No = models.CharField(max_length=255)
    Driver_Contact_No = models.CharField(max_length=255)
    Driver_Father_First_Name = models.CharField(max_length=255)
    Driver_Father_Last_Name = models.CharField(max_length=255)
    FineAmount = models.IntegerField(null=True)
    ViolationType = models.CharField(null=True)
    document_url = models.TextField(verbose_name='Document URL', null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    def __str__(self):
        return self.Vehicle_No

    class Meta:
        db_table = 'echallan_main'



class ResolutionStatus(models.Model):
    id = models.AutoField(primary_key=True)
    status = models.CharField(
        max_length=20,
        unique=True,
        verbose_name="Status"
    )
    description = models.TextField(verbose_name="Status Description")

    def __str__(self):
        return self.status



class EchallanQuery(models.Model):
    id = models.AutoField(primary_key=True)
    echallan = models.ForeignKey(
        'Echallan_main',
        on_delete=models.CASCADE,
        related_name='queries',
        verbose_name="E-Challan"
    )
    user = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='queries',
        verbose_name="User"
    )
    query_description = models.TextField(verbose_name="Query Description")
    query_date = models.DateTimeField(
        auto_now_add=True, verbose_name="Query Date")
    issue_type = models.TextField(verbose_name='Issue Type')
    resolution_status = models.ForeignKey(
        'ResolutionStatus',
        on_delete=models.SET_DEFAULT,
        default=1,  # Ensure that an appropriate default ResolutionStatus entry exists
        verbose_name="Resolution Status"
    )
    ticket_no = models.CharField(max_length=15, unique=True, editable=False)
    document_url = models.TextField(verbose_name='Document URL')
    resolution_details = models.TextField(
        null=True,
        blank=True,
        verbose_name="Resolution Details"
    )
    resolved_by = models.ForeignKey(
        'User',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='resolved_queries',
        verbose_name="Resolved By (Admin)"
    )
    resolved_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Resolved At"
    )

    def save(self, *args, **kwargs):
        if not self.ticket_no:
            current_year = datetime.datetime.now().year
            last_ticket = EchallanQuery.objects.filter(
                ticket_no__startswith=f"ECH-{current_year}").order_by('-id').first()
            if last_ticket:
                last_number = int(last_ticket.ticket_no.split('-')[-1])
            else:
                last_number = 0
            self.ticket_no = f"ECH-{current_year}-{last_number + 1:03d}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Query by {self.user_id.email} for E-Challan {self.echallan_id.id}"

