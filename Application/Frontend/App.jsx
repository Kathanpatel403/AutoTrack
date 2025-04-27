import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { theme } from "./app/core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  HomeScreen,
} from "./app/screens";

import GenerateEChallanScreen from "./app/screens/GenerateEChallanScreen";
import OfflineChallanScreen from "./app/screens/OfflineScreen";
import ReferenceGuideScreen from "./app/screens/ReferenceGuideScreen";
import AnalyticsDashboardScreen from "./app/screens/AnalyticsDashboardScreen";
import BackButton from "./app/components/BackButton";
import OTPPage from './app/screens/OtpPage';
import OfflineChallanListScreen from './app/screens/OfflineChallanListScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Function to create the main tab navigation after login
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "HomeScreen":
              iconName = "home";
              break;
            case "Generate":
              iconName = "edit-document";
              break;
            case "Offline":
              iconName = "offline-pin";
              break;
            case "Guide":
              iconName = "library-books";
              break;
            case "Analytics":
              iconName = "analytics";
              break;
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: true,
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Dashboard',
          headerLeft: () => (
            <BackButton goBack={navigation.goBack} />

          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')} // Replace 'Login' with your login screen's route name
              style={{ marginRight: 10, marginTop: 2 }}
            >
              <MaterialIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',

        })}
      />
      <Tab.Screen
        name="Generate"
        component={GenerateEChallanScreen}
        options={({ navigation }) => ({
          title: "Generate E-Challan",
          headerLeft: () => (
            <BackButton goBack={navigation.goBack} />
          ),

          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')} // Replace 'Login' with your login screen's route name
              style={{ marginRight: 10, marginTop: 2 }}
            >
              <MaterialIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}

      />
      {/* <Tab.Screen 
        name="Offline" 
        component={OfflineChallanScreen}
        options={{ title: "Offline Challan" }}
      /> */}
      <Tab.Screen
        name="Guide"
        component={ReferenceGuideScreen}
        options={({ navigation }) => ({
          title: "Reference Guide",
          headerLeft: () => (
            <BackButton goBack={navigation.goBack} />
          ),

          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')} // Replace 'Login' with your login screen's route name
              style={{ marginRight: 10, marginTop: 2 }}
            >
              <MaterialIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}

      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsDashboardScreen}
        options={({ navigation }) => ({
          title: "Analytics",
          headerLeft: () => (
            <BackButton goBack={navigation.goBack} />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')} // Replace 'Login' with your login screen's route name
              style={{ marginRight: 10, marginTop: 2 }}
            >
              <MaterialIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',

        })}
      />
    </Tab.Navigator>
  );
}

// export default function App() {
//   return (
//     <Provider theme={theme}>
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="StartScreen"
//           screenOptions={{
//             headerShown: false,
//           }}
//         >
//           <Stack.Screen name="StartScreen" component={StartScreen} />
//           <Stack.Screen name="LoginScreen" component={LoginScreen} />
//           <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
//           <Stack.Screen name="OfflineScreen" component={OfflineChallanScreen} />
//           <Stack.Screen 
//             name="MainApp" 
//             component={MainTabNavigator}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="ResetPasswordScreen"
//             component={ResetPasswordScreen}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync(MaterialIcons.font);
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or return a loading component
  }

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="OTPPage" component={OTPPage} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="OfflineScreen" component={OfflineChallanScreen} />
          <Stack.Screen name="OfflineChallanListScreen" component={OfflineChallanListScreen} />
          <Stack.Screen
            name="MainApp"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
