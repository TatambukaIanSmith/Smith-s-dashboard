import React, { useEffect, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const growthData = [
  { name: 'Jan', user: 4000, revenue: 2500 },
  { name: 'Feb', user: 3200, revenue: 1500 },
  { name: 'Mar', user: 2000, revenue: 10000 },
  { name: 'Apr', user: 3200, revenue: 4000 },
  { name: 'May', user: 2000, revenue: 5000 },
  { name: 'Jun', user: 2500, revenue: 4000 },
];

const sectorData = [
  { name: 'Tech', value: 35, color: '#3B82F6' },
  { name: 'Construction', value: 15, color: '#8B5CF6' },
  { name: 'Logistics', value: 30, color: '#10B981' },
  { name: 'Hospitality', value: 20, color: '#F59E0B' },
];

export const Analytics: React.FC = () => {
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    setSpin(true);
    const timer = setTimeout(() => setSpin(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-[1400px] mx-auto font-aptos pb-20">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Platform Analytics</h1>
        <p className="text-gray-500 text-lg font-medium">Deep dive into user growth, job trends, and performance metrics.</p>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Card: User & Revenue Growth */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-12">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-800">User & Revenue Growth</h3>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 14}} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 14}} 
                  ticks={[0, 2500, 5000, 7500, 10000]}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="user" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8B5CF6" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: '#8B5CF6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Card: Job Distribution by Sector */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <h3 className="text-xl font-bold text-gray-800">Job Distribution by Sector</h3>
          </div>
          
          <div className="flex-1 flex items-center gap-8">
            <div className={`w-[350px] h-[350px] transition-all duration-1000 ${spin ? 'animate-spin-gentle' : ''}`}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={130}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="space-y-4">
              {sectorData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};