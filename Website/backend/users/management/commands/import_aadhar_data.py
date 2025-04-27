import json
from django.core.management.base import BaseCommand
from django.db import transaction
from users.models import Person  # Replace 'your_app' with your actual app name
from ...data_utils import clean_person_data

class Command(BaseCommand):
    help = 'Import Person data from JSON file to PostgreSQL database'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='Path to the JSON file containing Person data')

    def handle(self, *args, **options):
        json_file = options['json_file']
        
        try:
            with open(json_file, 'r') as file:
                data = json.load(file)
                
            with transaction.atomic():
                success_count = 0
                error_count = 0
                
                for item in data:
                    try:
                        cleaned_data = clean_person_data(item)
                        Person.objects.create(**cleaned_data)
                        success_count += 1
                    except Exception as e:
                        error_count += 1
                        self.stdout.write(
                            self.style.ERROR(
                                f'Error importing person with Aadhar number {item.get("Aadhar_Number")}: {str(e)}'
                            )
                        )
                
                self.stdout.write(
                    self.style.SUCCESS(
                        f'Successfully imported {success_count} records. '
                        f'Failed to import {error_count} records.'
                    )
                )
                
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'File not found: {json_file}'))
        except json.JSONDecodeError:
            self.stdout.write(self.style.ERROR('Invalid JSON file'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))