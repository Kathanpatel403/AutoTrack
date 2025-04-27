import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BASE_URL } from "../services/apiService";

const OfflineChallanListScreen = () => {
  const [challans, setChallans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChallan, setSelectedChallan] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const navigation = useNavigation();

  // Load data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadChallans();
      checkNetworkStatus();

      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
      });

      return () => unsubscribe();
    }, [])
  );

  const checkNetworkStatus = async () => {
    const networkState = await NetInfo.fetch();
    setIsConnected(networkState.isConnected);
  };

  const loadChallans = async () => {
    setLoading(true);
    try {
      const data = await AsyncStorage.getItem('offline_challans');
      if (data) {
        const parsedData = JSON.parse(data);
        // Sort by timestamp (newest first)
        const sortedData = parsedData.sort((a, b) =>
          new Date(b.timestamp) - new Date(a.timestamp)
        );
        setChallans(sortedData);
      } else {
        setChallans([]);
      }
    } catch (error) {
      console.error('Error loading challans:', error);
      Alert.alert('Error', 'Failed to load saved challans');
    } finally {
      setLoading(false);
    }
  };

  const viewChallanDetails = (challan) => {
    setSelectedChallan(challan);
    setModalVisible(true);
  };

  const formatDate = (dateString) => {
    // Handle case where date might be undefined or null
    if (!dateString) return 'N/A';

    // Handle case where date might be in ISO format with time
    if (typeof dateString === 'string' && dateString.includes('T')) {
      return dateString.split('T')[0];
    }
    return dateString;
  };

  const submitChallanToAPI = async () => {
    if (!isConnected) {
      Alert.alert('No Connection', 'Please connect to the internet to submit challan');
      return;
    }

    setSubmitting(true);
    try {
      console.log(selectedChallan)
      // API submission logic
      const response = await fetch(`${BASE_URL}users/echallans/offline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedChallan),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      // If successful, remove from local storage
      await removeChallanFromStorage(selectedChallan.id);

      Alert.alert(
        'Success',
        'Challan submitted successfully',
        [{ text: 'OK', onPress: () => setModalVisible(false) }]
      );
    } catch (error) {
      console.error('API submission error:', error);
      Alert.alert('Submission Failed', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const removeChallanFromStorage = async (challanId) => {
    try {
      // Get existing data
      const data = await AsyncStorage.getItem('offline_challans');
      if (data) {
        const parsedData = JSON.parse(data);
        // Filter out the submitted challan
        const updatedChallans = parsedData.filter(challan => challan.id !== challanId);
        // Save back to storage
        await AsyncStorage.setItem('offline_challans', JSON.stringify(updatedChallans));
        // Update state
        setChallans(updatedChallans);
      }
    } catch (error) {
      console.error('Error removing challan:', error);
      throw error;
    }
  };

  const deleteChallan = async (challanId) => {
    Alert.alert(
      'Delete Challan',
      'Are you sure you want to delete this challan?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeChallanFromStorage(challanId);
              setModalVisible(false);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete challan');
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => {
    const date = formatDate(item.Violation_Date);
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => viewChallanDetails(item)}
      >
        <View>
          <Text style={styles.listItemTitle}>
            {item.Driver_First_Name} {item.Driver_Last_Name}
          </Text>
          <Text style={styles.listItemSubtitle}>
            License Plate Number: {item.License_plate_no}
          </Text>
          <Text style={styles.listItemDate}>
            Date: {date} | Fine: ₹{item.FineAmount || 'N/A'}
          </Text>
        </View>
        <Text style={styles.listItemArrow}>›</Text>
      </TouchableOpacity>
    );
  };

  const renderDetailItem = (label, value) => {
    return (
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>{label}:</Text>
        <Text style={styles.detailValue}>{value || 'N/A'}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Challans</Text>
        {!isConnected && (
          <View style={styles.offlineIndicator}>
            <Text style={styles.offlineText}>Offline</Text>
          </View>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading saved challans...</Text>
        </View>
      ) : challans.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No saved challans found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('OfflineScreen')}
          >
            <Text style={styles.backButtonText}>Go to Challan Form</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={challans}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      {/* Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Challan Details</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedChallan && (
              <ScrollView style={styles.detailsContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Driver Information</Text>
                </View>
                {renderDetailItem('Name', `${selectedChallan.Driver_First_Name} ${selectedChallan.Driver_Last_Name}`)}
                {renderDetailItem('License No', selectedChallan.Driving_license_No)}
                {renderDetailItem('Contact', selectedChallan.Driver_Contact_No)}
                {renderDetailItem('Father\'s Name', `${selectedChallan.Driver_Father_First_Name} ${selectedChallan.Driver_Father_Last_Name}`)}

                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Violation Information</Text>
                </View>
                {renderDetailItem('License Plate No', formatDate(selectedChallan.License_plate_no))}
                {renderDetailItem('Violation Date', formatDate(selectedChallan.Violation_Date))}
                {renderDetailItem('Challan Date', formatDate(selectedChallan.Challan_Date))}
                {renderDetailItem('Place of Violation', selectedChallan.Place_Of_Violation)}
                {renderDetailItem('Violation Type', selectedChallan.ViolationType)}
                {renderDetailItem('Fine Amount', selectedChallan.FineAmount ? `₹${selectedChallan.FineAmount}` : 'N/A')}

                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Metadata</Text>
                </View>
                {renderDetailItem('Created On', new Date(selectedChallan.timestamp).toLocaleString())}
                {renderDetailItem('Record ID', selectedChallan.id)}

                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteChallan(selectedChallan.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.submitApiButton,
                      (!isConnected || submitting) && styles.disabledButton
                    ]}
                    onPress={submitChallanToAPI}
                    disabled={!isConnected || submitting}
                  >
                    {submitting ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <Text style={styles.submitButtonText}>
                        Integrate
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 44,
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  offlineIndicator: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  offlineText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  listItemDate: {
    fontSize: 12,
    color: '#999',
  },
  listItemArrow: {
    fontSize: 24,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  separator: {
    height: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: '#4A90E2',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 16,
  },
  sectionHeader: {
    backgroundColor: '#F5F5F5',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  detailItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  detailLabel: {
    width: '40%',
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 26,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitApiButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#A8A8A8',
  },
});

export default OfflineChallanListScreen;