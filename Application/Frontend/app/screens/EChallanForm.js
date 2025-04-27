import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Animated, Easing, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from "../services/apiService";

export default function EChallanForm({ photo, uploadedImageUrl, onReset }) {

  const resetForm = () => {
    setFormData({
      Vehicle_No: '',
      Owner_First_Name: '',
      Owner_Last_Name: '',
      Vehicle_Class: '',
      Chassis_No: '',
      Engine_No: '',
      Make_Model: '',
      Violation_Date: currentDate,
      Challan_Date: currentDate,
      Place_Of_Violation: '',
      Driver_First_Name: '',
      Driver_Last_Name: '',
      Driving_license_No: '',
      Driver_Contact_No: '',
      Driver_Father_First_Name: '',
      Driver_Father_Last_Name: '',
      FineAmount: '',
      ViolationType: ''
    });
    setDetectedCharacter('');
    setIsSubmitted(false);
    setIsLoading(false);
    setIsDetecting(false);
    setFetchingDetails(false);
  };

  const handleCancel = () => {
    resetForm();
    onReset(); // Call the reset handler from parent
    navigation.navigate('HomeScreen');
  };


  const [isLoading, setIsLoading] = useState(false); // To control loading spinner
  const [isSubmitted, setIsSubmitted] = useState(false); // To show success message
  const [detectedCharacter, setDetectedCharacter] = useState(''); // To store the detected character
  const [isDetecting, setIsDetecting] = useState(false); // To track if character detection is in progress
  const [fetchingDetails, setFetchingDetails] = useState(false); // To track if fetching details is in progress
  const successAnim = new Animated.Value(0); // For success message animation
  const fadeAnim = new Animated.Value(1); // For smooth button transitions
  const [Violation_Date, setViolation_Date] = useState('');
  const [Challan_Date, setChallan_Date] = useState('');
  const currentDate = new Date().toISOString().split('T')[0];
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    Vehicle_No: '',
    Owner_First_Name: '',
    Owner_Last_Name: '',
    Vehicle_Class: '',
    Chassis_No: '',
    Engine_No: '',
    Make_Model: '',
    Violation_Date: currentDate,
    Challan_Date: currentDate,
    Place_Of_Violation: '',
    Driver_First_Name: '',
    Driver_Last_Name: '',
    Driving_license_No: '',
    Driver_Contact_No: '',
    Driver_Father_First_Name: '',
    Driver_Father_Last_Name: '',
    FineAmount: '',
    ViolationType: ''
  });


  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setViolation_Date(currentDate);
    setChallan_Date(currentDate);
  }, []);


  const validateField = (name, value) => {
    let error = '';

    // Check for empty fields
    if (!value || value.trim() === '') {
      return 'This field is required';
    }

    // Specific field validations
    switch (name) {
      case 'Driver_Contact_No':
        if (!/^\d{10}$/.test(value)) {
          error = 'Contact number must be exactly 10 digits';
        }
        break;
      case 'Driving_license_No':
        if (value.length > 15 || value.length < 15) {
          error = 'License number must be 15 digits';
        }
        break;
      case 'Vehicle_No':
        if (!/^[A-Z0-9 ]+$/.test(value)) {
          error = 'Vehicle number should contain only uppercase letters and numbers';
        }
        break;
      case 'FineAmount':
        if (isNaN(value) || value <= 0) {
          error = 'Please enter a valid fine amount';
        }
        break;
    }
    return error;
  };



  // Validate all form fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Debug logging for current form state
    console.log("Current Form Data:", formData);

    // Validate all form fields
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        console.log(`Validation failed for ${field}:`, {
          value: formData[field],
          error: error
        });
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Log all validation errors
    console.log("Validation Errors:", newErrors);
    setErrors(newErrors);
    return isValid;
  };


  const generateChallan = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill all required fields correctly');
      return;
    }

    try {
      setIsLoading(true);
      const dataToSend = {
        ...formData,
        Image_url: uploadedImageUrl
      };
      console.log("Image url:", formData.Image_url)
      const response = await axios.post(`${BASE_URL}users/generate-challan`, dataToSend, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data) {
        setIsSubmitted(true);
        fadeInSuccess();
        Alert.alert('Success', 'E-Challan generated successfully!');
        resetForm();
        onReset(); // Call the reset handler from parent
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.error('Error generating challan:', error);
      Alert.alert('Error', 'Failed to generate e-challan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  // Animate success message fade-in
  const fadeInSuccess = () => {
    Animated.timing(successAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  // Animate button transition
  const handleButtonPress = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.8,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }, 150);
  };


  // const handleFormChange = (field, value) => {
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [field]: value
  //   }));
  // };
  const handleFormChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Validate field
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };


  const fetchVehicleData = async () => {
    try {
      console.log("detected character: ", detectedCharacter)
      const response = await axios.post(`${BASE_URL}users/get-vehicle-data`,
        { vehicle_no: detectedCharacter },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("request sent to backend");

      if (response.data && response.data.data) {
        const vehicleData = response.data.data;
        // Update form data with received vehicle details
        setFormData(prevState => ({
          ...prevState,
          ...vehicleData,
          // Keep existing violation and fine fields
          ViolationType: prevState.ViolationType,
          FineAmount: prevState.FineAmount
        }));
        Alert.alert('Success', 'Vehicle details retrieved successfully');
      } else {
        Alert.alert('Vehicle Data Not Found', 'No data available for the provided vehicle number.');
      }
    } catch (error) {
      console.error('Error retrieving vehicle data:', error);
      Alert.alert('Error', 'Failed to fetch vehicle data. Please try again.');
    }
  };


  const handleCharacterDetection = async () => {
    try {
      setIsDetecting(true);
      console.log("before character detection.")
      const response = await axios.post(`${BASE_URL}users/detect-characters`,
        { image_url: uploadedImageUrl }, // Send as JSON data
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log("Request sent successfully!");
      const { detected_characters } = response.data;

      if (detected_characters) {
        Alert.alert('Character Detection', `Detected Vehicle Number: ${detected_characters}`);
        setDetectedCharacter(detected_characters);
        setIsDetecting(false);
      } else {
        Alert.alert('Character Detection', 'No vehicle number detected.');
      }
    } catch (error) {
      console.error('Error detecting characters:', error);
      Alert.alert('Error', 'Failed to detect characters. Please try again.');
    }
  };


  const renderInput = (field, placeholder, keyboardType = 'default', maxLength) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          errors[field] && touched[field] && styles.inputError
        ]}
        placeholder={placeholder}
        value={formData[field]}
        onChangeText={(text) => handleFormChange(field, text)}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onBlur={() => setTouched(prev => ({ ...prev, [field]: true }))}
      />
      {errors[field] && touched[field] && (
        <Text style={styles.errorText}>{errors[field]}</Text>
      )}
    </View>
  );


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>E-Challan Form</Text>

        {photo && (
          <Image source={{ uri: photo }} style={styles.preview} />
        )}

        <TouchableOpacity
          style={[styles.detectButton, isDetecting && styles.loadingButton]}
          onPress={() => { handleButtonPress(); handleCharacterDetection(); }}
          disabled={isDetecting}
        >
          {isDetecting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.DetectButtonText}>Detect Character</Text>
          )}
        </TouchableOpacity>

        {detectedCharacter && (
          <TextInput
            style={styles.input}
            placeholder="Detected Character"
            value={detectedCharacter}
            onChangeText={setDetectedCharacter}
          />
        )}

        <TouchableOpacity
          style={[styles.fetchButton, fetchingDetails && styles.loadingButton]}
          onPress={() => { handleButtonPress(); fetchVehicleData(); }}
          disabled={fetchingDetails}
        >
          {fetchingDetails ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.fetchButtonText}>Fetch Details</Text>
          )}
        </TouchableOpacity>

        {/* Vehicle Information Section */}
        <View style={styles.section}>
          {renderInput('Vehicle_No', 'Vehicle Number')}
          {renderInput('Vehicle_Class', 'Vehicle Class')}
          {renderInput('Chassis_No', 'Chassis Number')}
          {renderInput('Engine_No', 'Engine Number')}
          {renderInput('Make_Model', 'Make Model')}
        </View>

        {/* Owner Information Section */}
        <View style={styles.section}>
          {renderInput('Owner_First_Name', 'Owner First Name')}
          {renderInput('Owner_Last_Name', 'Owner Last Name')}
        </View>
        {/* Driver Information Section */}
        <View style={styles.section}>
          {renderInput('Driver_First_Name', 'Driver First Name')}
          {renderInput('Driver_Last_Name', 'Driver Last Name')}
          {renderInput('Driving_license_No', 'Driver\'s License Number', 'default', 15)}
          {renderInput('Driver_Contact_No', 'Driver Contact Number', 'numeric', 10)}
          {renderInput('Driver_Father_First_Name', 'Driver\'s Father First Name')}
          {renderInput('Driver_Father_Last_Name', 'Driver\'s Father Last Name')}
        </View>

        {/* Violation Information Section */}
        <View style={styles.section}>
          {renderInput('Violation_Date', 'Violation Date (YYYY-MM-DD)')}
          {renderInput('Challan_Date', 'Challan Date (YYYY-MM-DD)')}
          {renderInput('Place_Of_Violation', 'Place of Violation')}
          {renderInput('ViolationType', 'Violation Type')}
          {renderInput('FineAmount', 'Fine Amount', 'numeric')}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.loadingButton]}
            onPress={() => { handleButtonPress(); generateChallan(); }}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>

        {isSubmitted && (
          <Animated.View style={[styles.successMessage, { opacity: successAnim }]}>
            <Text style={styles.successText}>E-Challan Generated Successfully!</Text>
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Roboto',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
    marginLeft: 5,
  },
  input: {
    height: 50,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
    backgroundColor: '#F3F4F6',
    fontSize: 16,
    color: '#333',
    fontFamily: 'Roboto',
  },
  detectButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1 }],
    transition: 'all 0.3s ease-out',
  },
  fetchButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1 }],
    transition: 'all 0.3s ease-out',
  },
  DetectButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fetchButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingButton: {
    backgroundColor: '#A1C4FF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1 }],
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1 }],
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successMessage: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#D1FAE5',
    borderRadius: 8,
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    color: '#10B981',
    fontWeight: 'bold',
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
});
