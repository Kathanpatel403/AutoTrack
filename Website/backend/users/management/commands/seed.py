import random
import datetime
from django.utils import timezone
from django.contrib.auth import get_user_model
from users.models import (  # Replace 'myapp' with your actual app name
    User, OTPVerification, Person, Vehicle, Echallan_main, 
    ResolutionStatus, EchallanQuery, Payment
)
from django.db import transaction

# Generate a random date within a range
def random_date(start_year=2020, end_year=2025):
    start = datetime.date(start_year, 1, 1)
    end = datetime.date(end_year, 12, 31)
    return start + datetime.timedelta(days=random.randint(0, (end - start).days))

# Seeding Users
def seed_users():
    users = []
    roles = ['ADMIN', 'MANAGER', 'USER', 'PO']
    for i in range(10):
        user = User.objects.create_user(
            email=f'user{i+10}@example.com',
            password="Test@1234",
            role=random.choice(roles)
        )
        users.append(user)
    print(f"✅ Seeded {len(users)} Users")
    return users

# Seeding OTP Verification
def seed_otp(users):
    for user in users:
        OTPVerification.objects.create(
            user=user,
            otp=OTPVerification.generate_otp(),
            is_used=random.choice([True, False])
        )
    print("✅ Seeded OTP Verification")

# Seeding Persons
def seed_persons():
    persons = []
    for i in range(10):
        person = Person.objects.create(
            Aadhar_Number=f'1000{i}',
            Father_Aadhar_Number=f'2000{i}',
            Mother_Aadhar_Number=f'3000{i}',
            First_Name=f'First{i}',
            Last_Name=f'Last{i}',
            Date_of_Birth=random_date(1980, 2005),
            Gender=random.choice(['Male', 'Female']),
            Street=f"Street {i}",
            Area=f"Area {i}",
            City=f"City {i}",
            State=f"State {i}",
            Postal_Code=f"1000{i}",
            Mobile_Number=f"98765432{i}",
            Email=f'person{i}@mail.com',
            Enrollment_Date=random_date(2010, 2020),
            Last_Updated=random_date(2021, 2025)
        )
        persons.append(person)
    print(f"✅ Seeded {len(persons)} Persons")
    return persons

# Seeding Vehicles
def seed_vehicles(persons):
    vehicles = []
    for i, person in enumerate(persons):
        vehicle = Vehicle.objects.create(
            Aadhar_Number=person,
            First_Name=person.First_Name,
            Last_Name=person.Last_Name,
            Policy_No=f'POLICY-{i}',
            Provider=f'Provider-{i}',
            Valid_Until=random_date(2025, 2030),
            Certificate_No=f'CERT-{i}',
            Street=person.Street,
            Area=person.Area,
            City=person.City,
            State=person.State,
            Postal_Code=person.Postal_Code,
            Mobile_Number=person.Mobile_Number,
            Registration_Date=random_date(2015, 2025),
            Registration_Expiry=random_date(2026, 2035),
            Engine_No=f'ENG-{random.randint(10000, 99999)}',
            Chassis_No=f'CHS-{random.randint(10000, 99999)}',
            Engine_Capacity=random.randint(800, 5000),
            Seating_Capacity=random.randint(2, 7),
            Color=random.choice(['Red', 'Blue', 'Black', 'White']),
            Year_of_Manufacture=random_date(2015, 2022),
            Make_Model=f'Model {i}',
            Vehicle_Class=random.choice(['Car', 'Bike', 'Truck']),
            Vehicle_Type=random.choice(['Private', 'Commercial']),
            Fuel_Type=random.choice(['Petrol', 'Diesel', 'Electric']),
            RC_No=f'RC-{random.randint(10000, 99999)}',
            License_Plate_No=f'XYZ-{random.randint(1000, 9999)}',
            Is_Active=True
        )
        vehicles.append(vehicle)
    print(f"✅ Seeded {len(vehicles)} Vehicles")
    return vehicles

# Seeding Resolution Status
def seed_resolution_status():
    statuses = ['Pending', 'Resolved', 'Rejected']
    res_statuses = []
    for status in statuses:
        res_status = ResolutionStatus.objects.create(
            status=status,
            description=f"Status Description for {status}"
        )
        res_statuses.append(res_status)
    print(f"✅ Seeded {len(res_statuses)} Resolution Statuses")
    return res_statuses

# Seeding Echallan
def seed_echallans(vehicles):
    echallans = []
    for i, vehicle in enumerate(vehicles):
        echallan = Echallan_main.objects.create(
            vehicle=vehicle,
            Vehicle_No=vehicle.License_Plate_No,
            Owner_First_Name=vehicle.First_Name,
            Owner_Last_Name=vehicle.Last_Name,
            Vehicle_Class=vehicle.Vehicle_Class,
            Chassis_No=vehicle.Chassis_No,
            Engine_No=vehicle.Engine_No,
            Make_Model=vehicle.Make_Model,
            Violation_Date=random_date(2022, 2025),
            Challan_Date=random_date(2022, 2025),
            Place_Of_Violation=f"Location {random.randint(1, 10)}",
            Driver_First_Name=vehicle.First_Name,
            Driver_Last_Name=vehicle.Last_Name,
            Driving_license_No=f'DL{random.randint(10000, 99999)}',
            Driver_Contact_No=f"98765{random.randint(10000, 99999)}",
            Driver_Father_First_Name=f"Father{random.randint(1, 10)}",
            Driver_Father_Last_Name=f"Last{random.randint(1, 10)}",
            FineAmount=random.randint(500, 5000),
            ViolationType=random.choice(['Speeding', 'Signal Jump', 'Wrong Parking'])
        )
        echallans.append(echallan)
    print(f"✅ Seeded {len(echallans)} E-Challans")
    return echallans

# Seeding E-Challan Queries
def seed_echallan_queries(users, echallans, res_statuses):
    queries = []
    for i in range(5):
        query = EchallanQuery.objects.create(
            echallan=random.choice(echallans),
            user=random.choice(users),
            query_description="This is a sample query.",
            issue_type=random.choice(['Wrong Fine', 'License Issue', 'Duplicate Entry']),
            resolution_status=random.choice(res_statuses),
            document_url="http://example.com/doc.pdf",
            resolution_details="Resolved successfully.",
            resolved_by=random.choice(users) if random.choice([True, False]) else None,
            resolved_at=timezone.now() if random.choice([True, False]) else None
        )
        queries.append(query)
    print(f"✅ Seeded {len(queries)} E-Challan Queries")

# Seeding Payments
def seed_payments(users, echallans):
    payments = []
    for echallan in echallans:
        payment = Payment.objects.create(
            e_challan=echallan,
            paid_by=random.choice(users),
            amount=echallan.FineAmount,
            transaction_id=f'TXN-{random.randint(100000, 999999)}'
        )
        payments.append(payment)
    print(f"✅ Seeded {len(payments)} Payments")

# Run all seeding functions inside a transaction
with transaction.atomic():
    users = seed_users()
    seed_otp(users)
    persons = seed_persons()
    vehicles = seed_vehicles(persons)
    res_statuses = seed_resolution_status()
    echallans = seed_echallans(vehicles)
    seed_echallan_queries(users, echallans, res_statuses)
    seed_payments(users, echallans)

print("🎉 Database Seeding Completed Successfully!")
