import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Animated } from "react-native";
import { Text } from "react-native-paper";
import { Alert } from "react-native";
import * as Animatable from "react-native-animatable";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { BASE_URL } from "../services/apiService";


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);

  const onLoginPressed = async () => {
    const passwordError = passwordValidator(password.value);
    if (!email.value) {
    setEmail({ ...email, error: "Email cannot be empty" });
      return;
    }
    if (passwordError) {
      setPassword({ ...password, error: passwordError });
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });

      const data = await response.json();
      console.log(response.ok)
      if (response.ok) {
        // Save tokens to AsyncStorage
        // await AsyncStorage.setItem("refreshToken", data.refresh);
        // await AsyncStorage.setItem("accessToken", data.access);

        Alert.alert("Login Successful", "Welcome back!");
        navigation.reset({
          index: 0,
          routes: [{ name: "MainApp" }],
        });
      } else {
        Alert.alert("Login Failed", data.error || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background style={styles.background}>
      <Animatable.View animation="fadeIn" duration={1000}>
        <Logo />
      </Animatable.View>

      <Animatable.View animation="fadeIn" duration={1000} delay={500}>
        <Header>Welcome Back to AutoTrack</Header>
      </Animatable.View>


      {/* Email Input Field */}
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
      />


      {/* Password Input Field */}
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Animatable.View animation="zoomIn" delay={100} duration={800}>
        <Button
          mode="contained"
          onPress={onLoginPressed}
          style={styles.button}
          loading={loading}
        >
          Log in
        </Button>
      </Animatable.View>

      <View style={styles.row}>
        <Text>New to AutoTrack?</Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}> Sign up!</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});