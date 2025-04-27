import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

const OfflineScreen = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    License_plate_no: '',
    Driver_First_Name: '',
    Driver_Last_Name: '',
    Driving_license_No: '',
    Driver_Contact_No: '',
    Driver_Father_First_Name: '',
    Driver_Father_Last_Name: '',
    Violation_Date: currentDate,
    Challan_Date: currentDate,
    Place_Of_Violation: '',
    ViolationType: '',
    FineAmount: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  const successAnim = useRef(new Animated.Value(0)).current;

  // Check network status on component mount (keeping this for the network status indicator)
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    // Initial check
    NetInfo.fetch().then(state => {
      setIsOffline(!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      Animated.timing(successAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(successAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setIsSubmitted(false);
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted, successAnim]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Add basic validation for required fields

    if (!formData.Driver_First_Name) newErrors.Driver_First_Name = 'Driver first name is required';
    if (!formData.License_plate_no) newErrors.License_plate_no = 'License Plate number is required';
    if (!formData.Driver_Last_Name) newErrors.Driver_Last_Name = 'Driver last name is required';
    if (!formData.Driving_license_No) newErrors.Driving_license_No = 'License number is required';
    if (!formData.Violation_Date) newErrors.Violation_Date = 'Violation date is required';

    // Validate license number format (basic example)
    if (formData.Driving_license_No && formData.Driving_license_No.length < 5) {
      newErrors.Driving_license_No = 'License number is too short';
    }

    // Validate phone number format
    if (formData.Driver_Contact_No && !/^\d{10}$/.test(formData.Driver_Contact_No)) {
      newErrors.Driver_Contact_No = 'Contact number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please correct the errors in the form.");
      return;
    }

    setIsLoading(true);

    try {
      // Always store locally, regardless of network status
      await storeLocally(formData);
      setIsSubmitted(true);
      resetForm();
      Alert.alert(
        "Success",
        "Data saved locally successfully."
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save data: " + error.message);
      console.error("Saving error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const storeLocally = async (data) => {
    try {
      // Get existing stored data or initialize empty array
      const storedData = await AsyncStorage.getItem('offline_challans');
      const parsedData = storedData ? JSON.parse(storedData) : [];

      // Add timestamp to identify when it was created
      const dataWithTimestamp = {
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
      };

      // Add new data to array
      parsedData.push(dataWithTimestamp);

      // Store updated array
      await AsyncStorage.setItem('offline_challans', JSON.stringify(parsedData));
    } catch (error) {
      console.error("Error storing data locally:", error);
      throw error;
    }
  };

  const viewStoredChallans = async () => {
    try {
      navigation.navigate('OfflineChallanListScreen');
    } catch (error) {
      Alert.alert("Error", "Failed to navigate: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      License_plate_no: "",
      Driver_First_Name: '',
      Driver_Last_Name: '',
      Driving_license_No: '',
      Driver_Contact_No: '',
      Driver_Father_First_Name: '',
      Driver_Father_Last_Name: '',
      Violation_Date: currentDate,
      Challan_Date: currentDate,
      Place_Of_Violation: '',
      ViolationType: '',
      FineAmount: '',
    });
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Form",
      "Are you sure you want to cancel? All data will be lost.",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: resetForm }
      ]
    );
  };

  const renderInput = (name, placeholder, keyboardType = 'default', maxLength = undefined) => {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors[name] && styles.inputError]}
          placeholder={placeholder}
          value={formData[name]}
          onChangeText={(text) => handleInputChange(name, text)}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
        {errors[name] && <Text style={styles.errorText}>{errors[name]}</Text>}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Challan Form</Text>

        {isOffline && (
          <View style={styles.offlineIndicator}>
            <Text style={styles.offlineText}>You're currently offline.</Text>
          </View>
        )}

        {/* Driver Information Section */}
        <View style={styles.section}>
          {renderInput('License_plate_no', 'License Plate No')}
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
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Save Locally</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.offlinePendingScreenButton}
          onPress={viewStoredChallans}
        >
          <Text style={styles.submitButtonText}>View Saved Challans</Text>
        </TouchableOpacity>

        {isSubmitted && (
          <Animated.View style={[styles.successMessage, { opacity: successAnim }]}>
            <Text style={styles.successText}>
              Challan Saved Successfully!
            </Text>
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );
};

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    fontFamily: 'Roboto',
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 15,
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
    marginBottom: 10,
    backgroundColor: '#F3F4F6',
    fontSize: 16,
    color: '#333',
    fontFamily: 'Roboto',
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
  },
  offlinePendingScreenButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
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
  offlineIndicator: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  offlineText: {
    color: '#B91C1C',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default OfflineScreen;