import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

export default function StartScreen({ navigation }) {
  return (
    <Background style={styles.background}>
      
        {/* Logo with animation */}
        <Animatable.View animation="fadeIn" duration={1000}>
          <Logo />
        </Animatable.View>

        {/* Header with animation */}
        <Animatable.View animation="slideInUp" duration={1000} delay={500}>
          <Header style={styles.header}>Welcome to AutoTrack</Header>
        </Animatable.View>


        {/* Buttons with hover effect */}
        <View style={styles.buttonContainer}>
          <Animatable.View animation="zoomIn" delay={1500} duration={800}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("LoginScreen")}
              style={styles.button}
            >
              Log in
            </Button>
          </Animatable.View>

          <Animatable.View animation="zoomIn" delay={2000} duration={800}>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate("RegisterScreen")}
              style={styles.button}
            >
              Register as Officer
            </Button>
          </Animatable.View>
        </View>
      {/* </LinearGradient> */}
    </Background>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "red",
    
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },

  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
  button: {
    marginBottom: 10,
  },
});
