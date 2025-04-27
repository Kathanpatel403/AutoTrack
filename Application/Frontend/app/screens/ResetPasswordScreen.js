import React, { useState } from "react";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { emailValidator } from "../helpers/emailValidator";
import { ActivityIndicator, Alert } from 'react-native';
import { BASE_URL } from "../services/apiService";

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [isLoading, setIsLoading] = useState(false);


  const handleContinue = async () => {
    // First validate email
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    setIsLoading(true);
    try {
      // Make API request to send OTP
      const response = await fetch(`${BASE_URL}users/forgot-password/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.value 
        })
      });

      const data = await response.json();

      if (response.ok) {
        // If API call is successful, navigate to OTP page
        navigation.navigate("OTPPage", { 
          email: email.value 
        });
      } else {
        // Handle API error
        Alert.alert(
          "Error",
          data.message || "Failed to send OTP. Please try again."
        );
      }
    } catch (error) {
      // Handle network or other errors
      Alert.alert(
        "Error",
        "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Reset your password.</Header>
      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive an email with the reset link."
        editable={!isLoading}
      />
      <Button
        mode="contained"
        onPress={handleContinue}
        style={{ marginTop: 16 }}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          "Continue"
        )}
      </Button>
    </Background>
  );
}