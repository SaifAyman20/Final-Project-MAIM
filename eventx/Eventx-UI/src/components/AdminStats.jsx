import { useState, useEffect } from 'react';

export default function AdminStats() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    ticketsSold: 0,
    totalRevenue: 0,
    activeUsers: 0
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // بيانات تجريبية - سيتم استبدالها ببيانات حقيقية من API
    setStats({
      totalEvents: 24,
      ticketsSold: 1250,
      totalRevenue: 45200,
      activeUsers: 358
    });

    setChartData([
      { name: 'Jan', events: 4, tickets: 120, revenue: 4200 },
      { name: 'Feb', events: 6, tickets: 240, revenue: 8100 },
      { name: 'Mar', events: 3, tickets: 180, revenue: 6300 },
      { name: 'Apr', events: 8, tickets: 310, revenue: 11200 },
      { name: 'May', events: 5, tickets: 190, revenue: 7400 },
      { name: 'Jun', events: 7, tickets: 210, revenue: 8000 }
    ]);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-full mr-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Events</p>
            <p className="text-2xl font-bold">{stats.totalEvents}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 rounded-full mr-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tickets Sold</p>
            <p className="text-2xl font-bold">{stats.ticketsSold}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 bg-purple-100 rounded-full mr-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 bg-orange-100 rounded-full mr-4">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Users</p>
            <p className="text-2xl font-bold">{stats.activeUsers}</p>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 lg:col-span-4 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {chartData.map((month, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800">{month.name}</h4>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Events:</span>
                  <span className="font-medium">{month.events}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tickets:</span>
                  <span className="font-medium">{month.tickets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Revenue:</span>
                  <span className="font-medium">${month.revenue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}