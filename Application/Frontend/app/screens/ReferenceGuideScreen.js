import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';

const trafficRules = [
  { id: '1', violation: 'Over Speeding', fine: '₹1000-2000' },
  { id: '2', violation: 'Red Light Jump', fine: '₹1000' },
  { id: '3', violation: 'No Helmet', fine: '₹1000' },
  { id: '4', violation: 'Wrong Parking', fine: '₹500-1000' },
  { id: '5', violation: 'Using Mobile While Driving', fine: '₹1000' },
  { id: '6', violation: 'Driving Without License', fine: '₹5000' },
  // Add more rules as needed
];

export default function ReferenceGuideScreen() {
  const [data, setData] = useState(trafficRules);
  const [searchQuery, setSearchQuery] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // Fade animation for the screen

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setData(trafficRules);
    } else {
      const filteredData = trafficRules.filter((item) =>
        item.violation.toLowerCase().includes(query.toLowerCase())
      );
      setData(filteredData);
    }
  };

  const sortByFine = () => {
    const sortedData = [...data].sort((a, b) => {
      const fineA = parseInt(a.fine.replace(/[^0-9]/g, '')) || 0;
      const fineB = parseInt(b.fine.replace(/[^0-9]/g, '')) || 0;
      return fineA - fineB;
    });
    setData(sortedData);
  };

  const sortByViolation = () => {
    const sortedData = [...data].sort((a, b) =>
      a.violation.localeCompare(b.violation)
    );
    setData(sortedData);
  };

  const renderItem = ({ item }) => (
    <View style={styles.ruleItem}>
      <Text style={styles.violation}>{item.violation}</Text>
      <Text style={styles.fine}>Fine: {item.fine}</Text>
    </View>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Traffic Rules Reference</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search violations..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Sorting Buttons */}
      <View style={styles.sortButtonsContainer}>
        <TouchableOpacity style={styles.sortButton} onPress={sortByFine}>
          <Text style={styles.buttonText}>Sort by Fine</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={sortByViolation}>
          <Text style={styles.buttonText}>Sort by Name</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  sortButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sortButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  ruleItem: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#95ffff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  violation: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  fine: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
