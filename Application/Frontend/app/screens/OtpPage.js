import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Image, 
  Alert,
  ActivityIndicator 
} from "react-native";
import * as Animatable from "react-native-animatable";
import Background from "../components/Background";
import Header from "../components/Header";
import { BASE_URL } from "../services/apiService";


export default function OTPPage({ navigation, route }) {
  const { email } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputs = useRef([]);


  const verifyOtp = async () => {
    if (otp.every((digit) => digit !== "")) {
      setIsLoading(true);
      const enteredOtp = otp.join("");
      
      try {
        const response = await fetch(`${BASE_URL}users/forgot-password/verify-opt`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email, 
            otp: enteredOtp
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {  // Check HTTP status instead of success flag
          setIsOtpVerified(true);
          Alert.alert("Success", "OTP verified successfully");
        } else {
          Alert.alert("Error", data.error || "Invalid OTP. Please try again.");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to verify OTP. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };


  const handleResendOTP = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}users/forgot-password/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email  // Remove .value as email is already the string
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {  // Check HTTP status instead of success flag
        Alert.alert("Success", "OTP has been resent to your email.");
      } else {
        Alert.alert("Error", data.error || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    // Check if all OTP digits are filled
    if (otp.every(digit => digit !== "")) {
      verifyOtp();
    }
  }, [otp]);


  const handleSubmitPasswords = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}users/forgot-password/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email,
          new_password: password,
          confirm_password: confirmPassword
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {  // Check HTTP status instead of success flag
        Alert.alert("Success", "Password reset successful", [
          { text: "OK", onPress: () => navigation.navigate("LoginScreen") }
        ]);
      } else {
        Alert.alert("Error", data.error || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };


  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };


  return (
    <Background>
      <Animatable.View animation="fadeInDown" duration={1000} style={styles.logoContainer}>
        <Image source={require("../../assets/app.png")} style={styles.logo} />
      </Animatable.View>

      <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContainer}>
        <Header>{isOtpVerified ? "Set Password" : "Enter OTP"}</Header>
      </Animatable.View>

      {!isOtpVerified ? (
        <>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                editable={!isLoading}
              />
            ))}
          </View>

          <TouchableOpacity 
            style={styles.resendButton} 
            onPress={handleResendOTP}
            disabled={isLoading}
          >
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Animatable.View animation="fadeIn" style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!isLoading}
          />
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmitPasswords}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </Animatable.View>
      )}

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      )}
    </Background>
  );
}


const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 0,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  otpInput: {
    width: 46,
    height: 46,
    borderWidth: 2,
    borderColor: "#2563EB",
    textAlign: "center",
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: "#f0f8ff",
    color: "#2563EB",
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, 
    shadowRadius: 3,
    elevation: 3,
  },
  resendButton: {
    marginTop: 30,
    alignItems: "center",
    width: "100%",
  },
  resendText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  passwordContainer: {
    width: "90%",
    maxWidth: 400,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  passwordInput: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "#2563EB",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f0f8ff",
    color: "#2563EB",
  },
  submitButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
  },
});