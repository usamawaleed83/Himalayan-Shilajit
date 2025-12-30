import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils/api';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

const OrderStatusPage = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.getOrder(orderNumber);
        if (response.success) {
          setOrder(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (orderNumber) {
      fetchOrder();
    }
  }, [orderNumber]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <AnnouncementBar />
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
        <Footer />
        <CartDrawer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen">
        <AnnouncementBar />
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The order you are looking for does not exist.'}</p>
        </div>
        <Footer />
        <CartDrawer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnnouncementBar />
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary mb-2">Order Details</h1>
              <p className="text-gray-600">Order Number: <span className="font-semibold">{order.orderNumber}</span></p>
            </div>
            <div className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(order.orderStatus)}`}>
              {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-primary mb-2">Payment Status</h3>
              <div className={`inline-block px-4 py-2 rounded-full font-semibold ${getStatusColor(order.paymentStatus)}`}>
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Payment Method</h3>
              <p className="text-gray-600 capitalize">{order.paymentMethod.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-serif font-bold text-primary mb-6">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-bold text-gold">PKR {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-serif font-bold text-primary mb-6">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-primary mb-2">Name</h3>
              <p className="text-gray-600">{order.customer.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Email</h3>
              <p className="text-gray-600">{order.customer.email}</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Phone</h3>
              <p className="text-gray-600">{order.customer.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Address</h3>
              <p className="text-gray-600">
                {order.customer.address.street}<br />
                {order.customer.address.city}, {order.customer.address.province}<br />
                {order.customer.address.postalCode}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-serif font-bold text-primary mb-6">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">PKR {order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">{order.shipping === 0 ? 'Free' : `PKR ${order.shipping.toFixed(2)}`}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-gold">PKR {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default OrderStatusPage;


