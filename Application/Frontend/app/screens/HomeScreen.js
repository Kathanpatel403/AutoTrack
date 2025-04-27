import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import { Card, Title, Paragraph, Badge, Surface } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';


// Default profile image
import defaultProfileImage from '../../assets/tf.jpg';
import axios from 'axios';
import {BASE_URL} from '../services/apiService';

export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [todayStats, setTodayStats] = useState({
    challansIssued: 0,
    totalAmount: 0,
    pendingSync: 0,
  });

  const [recentViolations, setRecentViolations] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [0, 0, 0, 0, 0, 0, 0],
    }],
  });

  const fetchTodayStats = async () => {
    try {
      const response = await axios.get(`${BASE_URL}users/today-stats/`);
      console.log("got response in home screen")
      setTodayStats({
        challansIssued: response.data.challans_issued,
        totalAmount: response.data.total_amount,
        pendingSync: response.data.pending_sync
      });
    } catch (error) {
      console.error('Failed to fetch today stats', error);
    }
  };

  const fetchWeeklyTrend = async () => {
    try {
      const response = await axios.get(`${BASE_URL}users/weekly-trend/`);
      setChartData(prev => ({
        ...prev,
        datasets: [{
          data: response.data.weekly_challans
        }]
      }));
    } catch (error) {
      console.error('Failed to fetch weekly trend', error);
    }
  };

  const fetchRecentViolations = async () => {
    try {
      const response = await axios.get(`${BASE_URL}users/recent-violations/`);
      setRecentViolations(response.data);
    } catch (error) {
      console.error('Failed to fetch recent violations', error);
    }
  };

  useEffect(() => {
    // Only fetch data when screen is focused
    if (isFocused) {
      const fetchInitialData = async () => {
        await fetchTodayStats();
        await fetchWeeklyTrend();
        await fetchRecentViolations();
      };

      fetchInitialData();

      // Set up interval to fetch data every 5 seconds only when focused
      const intervalId = setInterval(() => {
        if (isFocused) {
          fetchTodayStats();
          fetchWeeklyTrend();
          fetchRecentViolations();
        }
      }, 5000);

      // Clean up interval when component unmounts
      return () => clearInterval(intervalId);
    }
  }, [isFocused]);

  const pickImage = async () => {
    try {
      // Request permission to access the gallery
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'You need to allow access to the gallery to select an image.');
        return;
      }
  
      // Open the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images', // Use 'Images' as a string for mediaTypes
        allowsEditing: true,  // Allow basic editing like cropping
        aspect: [1, 1],       // Aspect ratio for square images
        quality: 1,           // Maximum quality for the selected image
      });
  
      // Check if the user canceled the action
      if (!result.canceled) {
        // Update profile image state
        setProfileImage({ uri: result.assets[0].uri });
      } else {
        Alert.alert('Image Picker', 'Image selection was canceled.');
      }
    } catch (error) {
      // Log and display error
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Something went wrong while picking the image.');
    }
  };

  const QuickStatsCard = ({ title, value, icon, color }) => (
    <Surface style={styles.quickStatCard}>
      <MaterialIcons name={icon} size={24} color={color} />
      <View style={styles.quickStatText}>
        <Paragraph>{title}</Paragraph>
        <Title style={{ color }}>{value}</Title>
      </View>
    </Surface>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4c6ef5', '#2a3eb1']}
        style={styles.headerBackground}
      >
        <View style={styles.header}>
          {/* Profile Image with Touchable to trigger change */}
          <TouchableOpacity onPress={pickImage}>
            <Animatable.View animation="bounceIn" duration={1000}>
              <Image
                source={profileImage} // Dynamic source for profile image
                style={styles.profileImage}
              />
            </Animatable.View>
          </TouchableOpacity>

          {/* Header Text */}
          <Animatable.View animation="fadeInUp" duration={1500} delay={500}>
            <Text style={styles.welcomeText}>Welcome, Officer</Text>
          </Animatable.View>

          {/* Date Text */}
          <Animatable.View animation="fadeInUp" duration={1500} delay={1000}>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </Animatable.View>
        </View>
      </LinearGradient>

      {/* Quick Action Buttons */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Generate')}
        >
          <MaterialIcons name="receipt-long" size={32} color="#fff" />
          <Text style={styles.actionButtonText}>New Challan</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('OfflineScreen')}
        >
          <MaterialIcons name="offline-pin" size={32} color="#fff" />
          <Text style={styles.actionButtonText}>Offline Mode</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <QuickStatsCard 
          title="Today's Challans" 
          value={todayStats.challansIssued}
          icon="receipt"
          color="#1976D2"
        />
        <QuickStatsCard 
          title="Total Amount" 
          value={`₹${todayStats.totalAmount}`}
          icon="payments"
          color="#388E3C"
        />
        <QuickStatsCard 
          title="Pending Sync" 
          value={todayStats.pendingSync}
          icon="sync-problem"
          color="#D32F2F"
        />
      </View>

      {/* Weekly Trend Chart */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>Weekly Challans Trend</Title>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 65}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(25, 118, 210, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Recent Violations */}
      <Card style={styles.recentCard}>
        <Card.Content>
          <Title>Recent Violations</Title>
          {recentViolations.map((violation) => (
            <Surface key={violation.id} style={styles.violationItem}>
              <View style={styles.violationHeader}>
                <View>
                  <Text style={styles.violationType}>{violation.type}</Text>
                  <Text style={styles.violationLocation}>
                    <MaterialIcons name="location-on" size={14} color="#666" />
                    {violation.location}
                  </Text>
                </View>
                <Badge size={24}>₹{violation.amount}</Badge>
              </View>
              <Text style={styles.violationTime}>{violation.time}</Text>
            </Surface>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Makes the image round
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
    marginTop: -20,
  },
  actionButton: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 12,
    width: '45%',
    marginVertical: 25,
    alignItems: 'center',
    elevation: 4,
  },
  actionButtonText: {
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  quickStatCard: {
    width: '31%',
    padding: 15,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  quickStatText: {
    alignItems: 'center',
    marginTop: 5,
  },
  chartCard: {
    margin: 15,
    borderRadius: 12,
    elevation: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  recentCard: {
    margin: 15,
    borderRadius: 12,
    elevation: 4,
  },
  violationItem: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  violationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  violationType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  violationLocation: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  violationTime: {
    color: '#666',
    fontSize: 12,
    marginTop: 8,
  },
});
