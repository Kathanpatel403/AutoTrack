import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ViolationsOverTime = () => {
  const data = [
    { day: 'Sunday', violations: 45 },
    { day: 'Monday', violations: 62 },
    { day: 'Tuesday', violations: 53 },
    { day: 'Wednesday', violations: 58 },
    { day: 'Thursday', violations: 50 },
    { day: 'Friday', violations: 67 },
    { day: 'Saturday', violations: 55 }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="violations" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ViolationsOverTime;