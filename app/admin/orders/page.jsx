'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, Truck, CheckCircle, Clock } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/admin/orders', config);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
            await axios.put(`http://localhost:5000/api/admin/orders/${id}/status`, { status }, config);
            fetchOrders();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const downloadInvoice = (id, orderNumber) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        // Direct link doesn't support Authorization header easily for file download without blob handling
        // For simplicity, assuming calling API with token in URL or handling via blob
        // Here using a simple window.open but it might fail if middleware requires header.
        // Better approach: fetch blob.

        axios.get(`http://localhost:5000/api/admin/orders/${id}/invoice`, {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${orderNumber}.pdf`);
            document.body.appendChild(link);
            link.click();
        }).catch(error => console.error('Download failed', error));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-bold text-gray-600">Order ID</th>
                            <th className="p-4 font-bold text-gray-600">Customer</th>
                            <th className="p-4 font-bold text-gray-600">Date</th>
                            <th className="p-4 font-bold text-gray-600">Total</th>
                            <th className="p-4 font-bold text-gray-600">Status</th>
                            <th className="p-4 font-bold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="p-4 font-mono text-sm">{order.orderNumber}</td>
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">{order.customer.name}</div>
                                    <div className="text-xs text-gray-500">{order.customer.email}</div>
                                </td>
                                <td className="p-4 text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 font-bold text-emerald-600">Rs. {order.total}</td>
                                <td className="p-4">
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) => updateStatus(order._id, e.target.value)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-none focus:ring-2 focus:ring-primary/50 cursor-pointer 
                      ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                                                order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'}`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => downloadInvoice(order._id, order.orderNumber)}
                                        className="flex items-center gap-2 text-primary hover:text-gold transition-colors text-sm font-medium"
                                    >
                                        <FileText size={16} />
                                        Invoice
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;