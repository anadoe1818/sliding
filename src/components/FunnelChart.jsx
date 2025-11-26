import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const FunnelChart = ({ data }) => {
  // Sort data in descending order for funnel effect
  const sortedData = [...data].sort((a, b) => b.value - a.value)
  
  // Color gradient for funnel
  const colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#cbd5e1', '#e5e7eb', '#f3f4f6']

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip 
            formatter={(value) => [`${value.toLocaleString()} users`, 'Users']}
            labelStyle={{ color: '#374151' }}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default FunnelChart

