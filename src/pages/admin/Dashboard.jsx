import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingBag, Users, Package } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo?.token}`
                    }
                };
                const { data } = await axios.get('http://localhost:5000/api/admin/stats', config);
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;
    if (!stats) return <div className="p-8 text-center text-red-500">Failed to load stats. Please log in as admin.</div>;

    const cards = [
        { label: 'Total Revenue', value: `Rs. ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Products', value: stats.totalProducts, icon: Package, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="space-y-8">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{card.label}</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-2">{card.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Top Selling Products</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.topProducts}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" hide />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="quantity" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Order Status</h3>
                    <div className="flex flex-col justify-center h-80 space-y-6">
                        <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-xl">
                            <span className="font-medium text-yellow-700">Pending Orders</span>
                            <span className="text-2xl font-bold text-yellow-700">{stats.pendingOrders}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                            <span className="font-medium text-green-700">Paid/Completed</span>
                            <span className="text-2xl font-bold text-green-700">{stats.paidOrders}</span>
                        </div>
                        <div className="text-center text-sm text-gray-400 mt-4">
                            Real-time updates enabled
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
