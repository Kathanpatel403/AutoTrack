# management/commands/import_vehicle_data.py

import json
from django.core.management.base import BaseCommand
from django.db import transaction
from users.models import Vehicle, Person  # Replace 'your_app' with your actual app name

class Command(BaseCommand):
    help = 'Import Vehicle data from JSON file to PostgreSQL database'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='Path to the JSON file containing Vehicle data')

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
                        # Check if the person exists first
                        aadhar_number = item.get('Aadhar_Number')
                        try:
                            person = Person.objects.get(Aadhar_Number=aadhar_number)
                        except Person.DoesNotExist:
                            raise Exception(f"Person with Aadhar number {aadhar_number} does not exist")
                        
                        # Clean and prepare the data
                        cleaned_data = self.clean_vehicle_data(item)
                        
                        # Set the foreign key to the Person instance
                        cleaned_data['Aadhar_Number'] = person
                        
                        # Create the vehicle record
                        Vehicle.objects.create(**cleaned_data)
                        success_count += 1
                        
                    except Exception as e:
                        error_count += 1
                        self.stdout.write(
                            self.style.ERROR(
                                f'Error importing vehicle with License Plate {item.get("License_Plate_No")}: {str(e)}'
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

    def clean_vehicle_data(self, data):
        """Clean and convert vehicle data for PostgreSQL."""
        from datetime import datetime
        
        cleaned_data = data.copy()
        
        # Remove Aadhar_Number from cleaned_data as we'll handle it separately
        if 'Aadhar_Number' in cleaned_data:
            del cleaned_data['Aadhar_Number']
        
        # Convert date fields from string to date objects
        date_fields = [
            'Registration_Date',
            'Registration_Expiry',
            'Valid_Until',
            'Year_of_Manufacture'
        ]
        
        for field in date_fields:
            if field in cleaned_data:
                try:
                    if field == 'Year_of_Manufacture':
                        # Handle year-only data by setting it to January 1st of that year
                        cleaned_data[field] = datetime.strptime(f"{cleaned_data[field]}-01-01", '%Y-%m-%d').date()
                    else:
                        cleaned_data[field] = datetime.strptime(cleaned_data[field], '%Y-%m-%d').date()
                except ValueError as e:
                    raise ValueError(f"Invalid date format for {field}: {cleaned_data[field]}")
        
        # Handle empty strings
        string_fields = ['Provider', 'Certificate_No']
        for field in string_fields:
            if field in cleaned_data and cleaned_data[field] == "":
                cleaned_data[field] = None
        
        # Ensure boolean fields are proper Python booleans
        if 'Is_Active' in cleaned_data:
            cleaned_data['Is_Active'] = bool(cleaned_data['Is_Active'])
        
        # Convert integer fields
        int_fields = ['Engine_Capacity', 'Seating_Capacity']
        for field in int_fields:
            if field in cleaned_data:
                cleaned_data[field] = int(cleaned_data[field])
        
        return cleaned_data