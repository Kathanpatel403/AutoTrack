from django.core.management.base import BaseCommand
from django.utils.timezone import now
from users.models import EchallanVerification,User
import random

class Command(BaseCommand):
    help = 'Seed the EchallanVerification model with sample data'

    def handle(self, *args, **kwargs):
        # Define sample data
        vehicle_numbers = ['MH12AB1234', 'DL8CAF0987', 'KA03XY5678', 'GJ01PQ4321']
        violated_rules = ['Red light jump', 'Over speeding', 'Wrong lane driving', 'No helmet']
        statuses = ['pending']
        users = list(User.objects.all())  # Get all users

        # Create sample records
        for _ in range(10):  # Seed 10 records
            vehicle_number = random.choice(vehicle_numbers)
            violated_rule = random.choice(violated_rules)
            status = random.choice(statuses)
            echallan_status = random.choice(statuses)
            verified_by = random.choice(users) if users and status != 'pending' else None
            verified_at = now() if verified_by else None

            EchallanVerification.objects.create(
                vehicle_number=vehicle_number,
                violated_rule=violated_rule,
                status=status,
                echallan_status=echallan_status,
                proof_image1='proof_images/sample1.jpg',  # Use sample image paths
                proof_image2='proof_images/sample2.jpg',
                verified_by=verified_by,
                verified_at=verified_at,
            )

        self.stdout.write(self.style.SUCCESS('Successfully seeded EchallanVerification data.'))
