import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { BarChart, LineChart, PieChart, ContributionGraph } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BASE_URL } from '../services/apiService';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';


export default function AnalyticsDashboardScreen() {
  const isFocused = useIsFocused();
  const screenWidth = Dimensions.get('window').width;
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [activeChart, setActiveChart] = useState('all');
  const [violationCounts, setViolationCounts] = useState({
    speeding: 0,
    'no helmet': 0,
    'red light': 0,
    'wrong side': 0,
    total: 0
  });
  const [analyticsData, setAnalyticsData] = useState({
    violationCounts: {
      speeding: 0,
      'no helmet': 0,
      'red light': 0,
      'wrong side': 0,
      total: 0
    },
    weeklyViolations: [0, 0, 0, 0, 0, 0, 0],
    monthlyViolations: [0, 0, 0, 0],
    dailyViolationDensity: []
  });

  const fetchAnalyticsData = async () => {
    try {
      if (!isFocused) return;

      const [
        violationResponse,
        weeklyResponse,
        monthlyResponse,
        dailyResponse
      ] = await Promise.all([
        axios.get(`${BASE_URL}users/violation-counts/`),
        axios.get(`${BASE_URL}users/weekly-violations/`),
        axios.get(`${BASE_URL}users/monthly-violations/`),
        axios.get(`${BASE_URL}users/daily-violation-density/`)
      ]);
      console.log("got response")

      const violationCounts = violationResponse.data.violation_counts.reduce((acc, item) => {
        console.log(`${item.ViolationType}: ${item.count}`)

        let violationType = item.ViolationType.toLowerCase();

        // Map all "wrong side" variants to the same key
        if (violationType === 'wrongside' ||
          violationType === 'wrong side' ||
          violationType === 'wrong lane driving') {
          violationType = 'wrong side';
        }

        // Add counts for the same violation type
        if (acc[violationType] !== undefined) {
          acc[violationType] += item.count;
        } else {
          // For any other violation types not in your predefined list
          acc[violationType] = item.count;
        }
        return acc;
      }, {
        speeding: 0,
        'no helmet': 0,
        'red light': 0,
        'wrong side': 0,
        total: violationResponse.data.total_challans
      });

      setAnalyticsData({
        violationCounts,
        weeklyViolations: weeklyResponse.data.violations,
        monthlyViolations: monthlyResponse.data.violations,
        dailyViolationDensity: dailyResponse.data.violations
      });
    } catch (error) {
      console.error('Failed to fetch analytics data', error);
    }
  };

  useEffect(() => {
    // Only fetch data when screen is focused
    if (isFocused) {
      fetchAnalyticsData();

      // Set up interval only when screen is focused
      const intervalId = setInterval(fetchAnalyticsData, 5000); // reduced interval to 30 seconds

      // Cleanup interval when screen is unfocused or component unmounts
      return () => clearInterval(intervalId);
    }
  }, [isFocused]);


  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: analyticsData.weeklyViolations,
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2,
    }]
  };

  const monthlyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      data: analyticsData.monthlyViolations,
      color: (opacity = 1) => `rgba(65, 129, 244, ${opacity})`,
      strokeWidth: 2,
    }]
  };

  const violationTypes = {
    labels: ['Speeding', 'No Helmet', 'Red Light', 'wrong side'],
    datasets: [{
      data: [
        analyticsData.violationCounts.speeding,
        analyticsData.violationCounts['no helmet'],
        analyticsData.violationCounts['red light'],
        analyticsData.violationCounts['wrong side']
      ],
      colors: [
        (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
        (opacity = 1) => `rgba(255, 206, 86, ${opacity})`,
        (opacity = 1) => `rgba(75, 192, 192, ${opacity})`
      ]
    }]
  };


  const violationDistribution = [
    {
      name: 'Speeding',
      population: analyticsData.violationCounts.speeding,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'No Helmet',
      population: analyticsData.violationCounts['no helmet'],
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Red Light',
      population: analyticsData.violationCounts['red light'],
      color: '#FFCE56',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Wrong Side',
      population: analyticsData.violationCounts['wrong side'],
      color: '#4BC0C0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }
  ];

  const commitsData = analyticsData.dailyViolationDensity.map(item => ({
    date: item.date,
    count: item.count
  }));

  const renderPieChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Violation Distribution (Total: {violationCounts.total})</Text>
      <PieChart
        data={violationDistribution}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
      />
    </View>
  );

  // Animated values for each chart
  const [chartAnimations] = useState({
    line: new Animated.Value(0),
    bar: new Animated.Value(0),
    pie: new Animated.Value(0),
    contribution: new Animated.Value(0),
  });

  const animateCharts = () => {
    const animations = Object.keys(chartAnimations).map(key =>
      Animated.timing(chartAnimations[key], {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );

    Animated.stagger(250, animations).start();
  };

  useEffect(() => {
    animateCharts();
  }, []);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   // Reset animations
  //   Object.keys(chartAnimations).forEach(key => {
  //     chartAnimations[key].setValue(0);
  //   });

  //   // Simulate data refresh
  //   setTimeout(() => {
  //     setWeeklyData({
  //       ...weeklyData,
  //       datasets: [{
  //         ...weeklyData.datasets[0],
  //         data: weeklyData.datasets[0].data.map(() => Math.floor(Math.random() * 100))
  //       }]
  //     });
  //     animateCharts();
  //     setRefreshing(false);
  //   }, 1500);
  // }, []);


  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      <TouchableOpacity
        style={[styles.periodButton, selectedPeriod === 'week' && styles.selectedPeriod]}
        onPress={() => setSelectedPeriod('week')}>
        <Text style={[styles.periodButtonText, selectedPeriod === 'week' && styles.selectedPeriodText]}>Week</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.periodButton, selectedPeriod === 'month' && styles.selectedPeriod]}
        onPress={() => setSelectedPeriod('month')}>
        <Text style={[styles.periodButtonText, selectedPeriod === 'month' && styles.selectedPeriodText]}>Month</Text>
      </TouchableOpacity>
    </View>
  );

  const renderChart = (type) => {
    if (activeChart !== 'all' && activeChart !== type) return null;

    const commonProps = {
      width: screenWidth - 40,
      height: 220,
      chartConfig,
      style: styles.chart,
    };

    switch (type) {
      case 'line':
        return (
          <Animated.View style={[styles.chartContainer, { opacity: chartAnimations.line }]}>
            <Text style={styles.chartTitle}>Violations Over Time</Text>
            {renderPeriodSelector()}
            <LineChart
              data={selectedPeriod === 'week' ? weeklyData : monthlyData}
              {...commonProps}
              bezier
            />
          </Animated.View>
        );
      case 'bar':
        return (
          <Animated.View style={[styles.chartContainer, { opacity: chartAnimations.bar }]}>
            <Text style={styles.chartTitle}>Violation Types</Text>
            <BarChart
              data={violationTypes}
              {...commonProps}
              showValuesOnTopOfBars
            />
          </Animated.View>
        );
      case 'pie':
        return (
          <Animated.View style={[styles.chartContainer, { opacity: chartAnimations.pie }]}>
            <Text style={styles.chartTitle}>Violation Distribution</Text>
            <PieChart
              data={violationDistribution}
              {...commonProps}
              accessor="population"
              backgroundColor="transparent"

            />
          </Animated.View>
        );
      case 'contribution':
        return (
          <Animated.View style={[styles.chartContainer, { opacity: chartAnimations.contribution }]}>
            <Text style={styles.chartTitle}>Daily Violation Density</Text>
            <ContributionGraph
              values={commitsData}
              {...commonProps}
              numDays={30}
              endDate={new Date()}
              squareSize={16}
            />
          </Animated.View>
        );
    }
  };

  return (
    <ScrollView
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Dashboard</Text>
        <TouchableOpacity style={styles.refreshButton}>
          <Icon name="refresh" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.chartTypeSelector}>
        {['all', 'line', 'bar', 'pie', 'contribution'].map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.chartTypeButton, activeChart === type && styles.activeChartType]}
            onPress={() => setActiveChart(type)}
          >
            <Text style={[styles.chartTypeText, activeChart === type && styles.activeChartTypeText]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderChart('line')}
      {renderChart('bar')}
      {renderChart('pie')}
      {renderChart('contribution')}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  refreshButton: {
    padding: 8,
  },
  chartTypeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 8,
  },
  chartTypeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeChartType: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chartTypeText: {
    color: '#666',
    fontSize: 14,
  },
  activeChartTypeText: {
    color: '#fff',
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#95ffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  selectedPeriod: {
    backgroundColor: '#fff',
    shadowColor: '#95ffff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  periodButtonText: {
    color: '#666',
    fontSize: 14,
  },
  selectedPeriodText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});