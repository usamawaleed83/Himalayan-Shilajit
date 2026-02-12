'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../contexts/CartContext';
import { api } from '../utils/api';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

const CheckoutPageClient = () => {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Customer Info, 2: Payment Method, 3: Payment Details
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentData, setPaymentData] = useState(null);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      province: '',
      postalCode: '',
      country: 'Pakistan'
    }
  });

  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  // WhatsApp integration
  const sendWhatsAppOrder = () => {
    const whatsappNumber = '923492832456'; // Your WhatsApp number (without + or spaces)
    
    // Create order message
    let message = `🛍️ *New Order - HerbalSource*\n\n`;
    message += `📋 *Order Number:* ${orderNumber}\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${customerInfo.name}\n`;
    message += `Phone: ${customerInfo.phone}\n`;
    message += `Email: ${customerInfo.email}\n\n`;
    message += `📍 *Delivery Address:*\n`;
    message += `${customerInfo.address.street}\n`;
    message += `${customerInfo.address.city}, ${customerInfo.address.province}\n`;
    message += `${customerInfo.address.postalCode}, ${customerInfo.address.country}\n\n`;
    message += `🛒 *Order Items:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x${item.quantity} - PKR ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n💰 *Order Summary:*\n`;
    message += `Subtotal: PKR ${subtotal.toFixed(2)}\n`;
    message += `Shipping: ${shipping === 0 ? 'Free' : `PKR ${shipping.toFixed(2)}`}\n`;
    message += `*Total: PKR ${total.toFixed(2)}*\n\n`;
    message += `💵 *Payment Method:* Cash on Delivery\n\n`;
    message += `✅ Please confirm this order.`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCustomerInfo(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setCustomerInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleContinueToPayment = () => {
    // Just move to step 2 without creating order yet
    setStep(2);
  };

  const createOrderAndProcessPayment = async (selectedPaymentMethod) => {
    setLoading(true);
    try {
      console.log('Creating order with payment method:', selectedPaymentMethod);
      console.log('Customer info:', customerInfo);
      console.log('Items:', items);
      
      // First create the order with selected payment method
      const orderData = {
        customer: customerInfo,
        items: items.map(item => ({
          productId: item.id || item._id,
          slug: item.slug, // Include slug for lookup
          name: item.name, // Include name as fallback
          quantity: item.quantity
        })),
        paymentMethod: selectedPaymentMethod
      };

      console.log('Sending order data:', orderData);
      
      const orderResponse = await api.createOrder(orderData);
      console.log('Order response:', orderResponse);
      
      if (!orderResponse.success) {
        alert('Failed to create order: ' + orderResponse.message);
        setLoading(false);
        return;
      }

      const newOrderNumber = orderResponse.data.orderNumber;
      setOrderNumber(newOrderNumber);
      setPaymentMethod(selectedPaymentMethod);

      // Then initiate payment based on method
      if (selectedPaymentMethod === 'easypaisa') {
        const paymentResponse = await api.initiateEasypaisaPayment({
          orderNumber: newOrderNumber,
          amount: total,
          customerPhone: customerInfo.phone
        });

        if (paymentResponse.success) {
          setPaymentData(paymentResponse.data);
          setStep(3);
          clearCart(); // Clear cart after successful order
          // Open payment URL in new tab if available
          if (paymentResponse.data.paymentUrl) {
            window.open(paymentResponse.data.paymentUrl, '_blank');
          }
        } else {
          alert('Failed to initiate payment: ' + paymentResponse.message);
        }
      } else if (selectedPaymentMethod === 'bank_transfer') {
        const paymentResponse = await api.initiateBankTransfer({
          orderNumber: newOrderNumber,
          amount: total,
          bankName: 'Selected Bank'
        });

        if (paymentResponse.success) {
          setPaymentData(paymentResponse.data);
          setStep(3);
          clearCart(); // Clear cart after successful order
        } else {
          alert('Failed to initiate bank transfer: ' + paymentResponse.message);
        }
      } else if (selectedPaymentMethod === 'cash_on_delivery') {
        // Cash on Delivery - no payment processing needed
        // Order is created with paymentStatus: 'pending'
        // Payment will be collected on delivery
        console.log('Setting up COD payment data');
        setPaymentData({
          orderNumber: newOrderNumber,
          paymentMethod: 'cash_on_delivery',
          message: 'Your order has been placed successfully! Payment will be collected when you receive your order.',
          instructions: 'Please have the exact amount ready for delivery. Our delivery person will collect payment upon delivery.'
        });
        setStep(3);
        clearCart(); // Clear cart after successful COD order
      }
    } catch (error) {
      console.error('Error:', error);
      console.error('Error details:', error.message, error.stack);
      alert('Error processing payment: ' + (error.message || 'Please try again'));
    } finally {
      setLoading(false);
    }
  };

  const handleEasypaisaPayment = () => {
    createOrderAndProcessPayment('easypaisa');
  };

  const handleBankTransfer = () => {
    createOrderAndProcessPayment('bank_transfer');
  };

  if (items.length === 0 && !orderNumber) {
    return (
      <div className="min-h-screen">
        <AnnouncementBar />
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Your cart is empty</h2>
          <button
            onClick={() => router.push('/products')}
            className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-gold hover:text-primary transition-colors"
          >
            Continue Shopping
          </button>
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
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                  step >= s ? 'bg-gold text-primary' : 'bg-gray-300 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step > s ? 'bg-gold' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-gold font-semibold' : 'text-gray-500'}>Customer Info</span>
            <span className={step >= 2 ? 'text-gold font-semibold' : 'text-gray-500'}>Payment Method</span>
            <span className={step >= 3 ? 'text-gold font-semibold' : 'text-gray-500'}>Payment Details</span>
          </div>
        </div>

        {/* Step 1: Customer Information */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Customer Information</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleContinueToPayment(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">City *</label>
                  <input
                    type="text"
                    name="address.city"
                    value={customerInfo.address.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Province *</label>
                  <input
                    type="text"
                    name="address.province"
                    value={customerInfo.address.province}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Postal Code *</label>
                  <input
                    type="text"
                    name="address.postalCode"
                    value={customerInfo.address.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Street Address *</label>
                <textarea
                  name="address.street"
                  value={customerInfo.address.street}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-gold hover:text-primary transition-all duration-300"
              >
                Continue to Payment
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Select Payment Method</h2>
            
            {loading && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gold"></div>
                <p className="text-blue-800">Processing your order...</p>
              </div>
            )}

            <div className="space-y-4 mb-8">
              <button
                onClick={() => {
                  createOrderAndProcessPayment('cash_on_delivery');
                }}
                disabled={loading}
                className="w-full p-6 border-2 border-gray-300 rounded-xl hover:border-gold hover:bg-gold/5 transition-all duration-300 text-left flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">💵</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary group-hover:text-gold">Cash on Delivery</h3>
                    <p className="text-gray-600">Pay when you receive your order</p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-primary mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-semibold">PKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? 'Free' : `PKR ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-gold">PKR {total.toFixed(2)}</span>
                </div>
              </div>
              {orderNumber && (
                <p className="text-sm text-gray-600 mt-4">Order Number: <span className="font-semibold">{orderNumber}</span></p>
              )}
            </div>

            <button
              onClick={() => setStep(1)}
              className="mt-6 w-full bg-gray-200 text-primary py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Back to Customer Info
            </button>
          </div>
        )}

        {/* Step 3: Payment Details */}
        {step === 3 && paymentData && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-2">Payment Instructions</h2>
              <p className="text-gray-600">Follow the instructions below to complete your payment</p>
            </div>

            {paymentMethod === 'easypaisa' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-primary mb-4">Easypaisa Payment</h3>
                  <p className="mb-4">Transaction Reference: <span className="font-bold text-gold">{paymentData.transactionRef}</span></p>
                  {paymentData.qrCode && (
                    <div className="text-center mb-4">
                      <Image 
                        src={paymentData.qrCode} 
                        alt="QR Code" 
                        width={200}
                        height={200}
                        className="mx-auto mb-2" 
                      />
                      <p className="text-sm text-gray-600">Scan QR code with Easypaisa app</p>
                    </div>
                  )}
                  <a
                    href={paymentData.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gold text-primary py-4 rounded-lg font-semibold text-center hover:bg-gold-dark transition-colors mb-4"
                  >
                    Complete Payment via Easypaisa
                  </a>
                  <p className="text-sm text-gray-600 text-center">{paymentData.message}</p>
                </div>
              </div>
            )}

            {paymentMethod === 'bank_transfer' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-primary mb-4">Bank Transfer Details</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Title:</span>
                      <span className="font-semibold">{paymentData.bankDetails.accountTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Number:</span>
                      <span className="font-semibold">{paymentData.bankDetails.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank Name:</span>
                      <span className="font-semibold">{paymentData.bankDetails.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">IBAN:</span>
                      <span className="font-semibold">{paymentData.bankDetails.iban}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Branch:</span>
                      <span className="font-semibold">{paymentData.bankDetails.branch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-gold text-lg">PKR {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction Reference:</span>
                      <span className="font-bold text-primary">{paymentData.transactionReference}</span>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 font-medium mb-2">Important:</p>
                    <p className="text-sm text-yellow-700">{paymentData.instructions}</p>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cash_on_delivery' && (
              <div className="space-y-6">
                <div className="bg-green/10 rounded-xl p-6 border-2 border-green/20">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">💵</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-primary mb-2">Cash on Delivery</h3>
                    <p className="text-gray-600">Your order has been placed successfully!</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Order Number:</span>
                        <span className="font-bold text-primary text-lg">{paymentData.orderNumber}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-bold text-gold text-xl">PKR {total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-semibold text-green">Cash on Delivery</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-blue-800 font-medium mb-1">Payment Instructions:</p>
                        <p className="text-sm text-blue-700">{paymentData.instructions}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 font-medium mb-2">📦 Delivery Information:</p>
                    <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                      <li>Please have the exact amount ready: <strong>PKR {total.toFixed(2)}</strong></li>
                      <li>Our delivery person will collect payment upon delivery</li>
                      <li>You'll receive a call before delivery</li>
                      <li>Expected delivery: 3-5 business days</li>
                    </ul>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 mb-4">{paymentData.message}</p>
                    
                    <button
                      onClick={sendWhatsAppOrder}
                      className="w-full bg-green text-white py-4 rounded-lg font-semibold text-lg hover:bg-green/90 transition-colors flex items-center justify-center gap-3 mb-4"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Confirm Order via WhatsApp
                    </button>
                    
                    <p className="text-xs text-gray-500">Click to send order details to our WhatsApp</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex-1 bg-gray-200 text-primary py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => router.push(`/order/${orderNumber}`)}
                className="flex-1 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-gold hover:text-primary transition-colors"
              >
                View Order Status
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default CheckoutPageClient;