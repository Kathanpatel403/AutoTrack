import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from faker import Faker
from ...models import Vehicle, Echallan_main

User = get_user_model()
fake = Faker()

class Command(BaseCommand):
    help = 'Seeds users and e-challans with Faker-generated data'

    def handle(self, *args, **kwargs):
        # self.seed_users()
        self.seed_echallans()
        self.stdout.write(self.style.SUCCESS('Database seeding completed successfully'))

    def seed_users(self):
        existing_users_count = User.objects.count()
        users_to_create = max(0, 60 - existing_users_count)
        
        roles = ['ADMIN', 'MANAGER', 'USER', 'PO']
        
        for _ in range(users_to_create):
            User.objects.create_user(
                email=fake.unique.email(), 
                password=fake.password(),
                role=random.choice(roles)
            )
    
        self.stdout.write(self.style.SUCCESS(f'Added {users_to_create} new users'))

    def seed_echallans(self):
        existing_echallans_count = Echallan_main.objects.count()
        vehicles = list(Vehicle.objects.all())
        violation_types = ['speeding', 'no helmet', 'red light', 'wrong side']
        
        challans_to_add = max(0, 100 - existing_echallans_count)

        for _ in range(challans_to_add):
            # Randomly select a vehicle for challan details
            vehicle = random.choice(vehicles)
            
            Echallan_main.objects.create(
                vehicle=vehicle,
                Vehicle_No=vehicle.License_Plate_No,
                Owner_First_Name=vehicle.First_Name,
                Owner_Last_Name=vehicle.Last_Name,
                Vehicle_Class=vehicle.Vehicle_Class,
                Chassis_No=vehicle.Chassis_No,
                Engine_No=vehicle.Engine_No,
                Make_Model=vehicle.Make_Model,
                Violation_Date=fake.date_this_year(),
                Challan_Date=fake.date_this_year(),
                Place_Of_Violation=fake.city(),
                Driver_First_Name=fake.first_name(),
                Driver_Last_Name=fake.last_name(),
                Driving_license_No=f'DL{random.randint(1000, 9999)}',
                Driver_Contact_No=fake.phone_number(),
                Driver_Father_First_Name=fake.first_name_male(),
                Driver_Father_Last_Name=fake.last_name(),
                FineAmount=random.randint(500, 5000),
                ViolationType=random.choice(violation_types)
            )
        
        self.stdout.write(self.style.SUCCESS('E-Challans seeded successfully'))