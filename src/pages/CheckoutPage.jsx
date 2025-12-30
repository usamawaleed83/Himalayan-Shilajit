import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { api } from '../utils/api';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

const CheckoutPage = () => {
  const navigate = useNavigate();
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

      const orderResponse = await api.createOrder(orderData);
      
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
        } else {
          alert('Failed to initiate bank transfer: ' + paymentResponse.message);
        }
      } else if (selectedPaymentMethod === 'cash_on_delivery') {
        // Cash on Delivery - no payment processing needed
        // Order is created with paymentStatus: 'pending'
        // Payment will be collected on delivery
        setPaymentData({
          orderNumber: newOrderNumber,
          paymentMethod: 'cash_on_delivery',
          message: 'Your order has been placed successfully! Payment will be collected when you receive your order.',
          instructions: 'Please have the exact amount ready for delivery. Our delivery person will collect payment upon delivery.'
        });
        setStep(3);
      }
    } catch (error) {
      console.error('Error:', error);
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
            onClick={() => navigate('/products')}
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
                onClick={handleEasypaisaPayment}
                disabled={loading}
                className="w-full p-6 border-2 border-gray-300 rounded-xl hover:border-gold hover:bg-gold/5 transition-all duration-300 text-left flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">📱</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary group-hover:text-gold">Easypaisa</h3>
                    <p className="text-gray-600">Pay via Easypaisa mobile wallet</p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={handleBankTransfer}
                disabled={loading}
                className="w-full p-6 border-2 border-gray-300 rounded-xl hover:border-gold hover:bg-gold/5 transition-all duration-300 text-left flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">🏦</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary group-hover:text-gold">Bank Transfer</h3>
                    <p className="text-gray-600">Transfer directly to our bank account</p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

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
                      <img src={paymentData.qrCode} alt="QR Code" className="mx-auto mb-2" />
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
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-200 text-primary py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate(`/order/${orderNumber}`)}
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

export default CheckoutPage;

