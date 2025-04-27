from datetime import datetime

def convert_date_string(date_str):
    """Convert date string to Python date object."""
    if not date_str:
        return None
    try:
        return datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        raise ValueError(f"Invalid date format: {date_str}")

def clean_person_data(data):
    """Clean and convert person data for PostgreSQL."""
    cleaned_data = data.copy()
    
    # Convert date fields
    date_fields = ['Date_of_Birth', 'Enrollment_Date', 'Last_Updated']
    for field in date_fields:
        if field in cleaned_data:
            cleaned_data[field] = convert_date_string(cleaned_data[field])
    
    # Ensure empty strings are converted to None for optional fields
    optional_fields = ['Father_Aadhar_Number', 'Mother_Aadhar_Number']
    for field in optional_fields:
        if field in cleaned_data and cleaned_data[field] == "":
            cleaned_data[field] = None
    
    # Ensure boolean fields are proper Python booleans
    if 'Is_Active' in cleaned_data:
        cleaned_data['Is_Active'] = bool(cleaned_data['Is_Active'])
    
    return cleaned_data