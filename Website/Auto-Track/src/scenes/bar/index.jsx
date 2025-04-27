import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChart = ({ data = [], labels = [], xAxisLabel = "Day", yAxisLabel = "Value", isDashboard = false }) => {
  // Default data if none is provided
  const defaultData = [
    { day: 'Sunday', violations: 45 },
    { day: 'Monday', violations: 62 },
    { day: 'Tuesday', violations: 53 },
    { day: 'Wednesday', violations: 58 },
    { day: 'Thursday', violations: 50 },
    { day: 'Friday', violations: 67 },
    { day: 'Saturday', violations: 55 }
  ];

  // Transform the data if provided
  const chartData = data.length > 0 && labels.length > 0
    ? labels.map((label, index) => ({
        name: label,
        value: data[index],
      }))
    : defaultData;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={chartData} margin={isDashboard ? { top: 10, right: 30, left: 0, bottom: 0 } : { top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={data.length > 0 ? "name" : "day"} 
          label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Legend />
        <Bar 
          dataKey={data.length > 0 ? "value" : "violations"} 
          fill="#8884d8" 
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;