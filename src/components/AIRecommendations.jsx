import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import ProductCard from './ProductCard';

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await api.getProductRecommendations();
        if (response.success) {
          setRecommendations(response.recommendations || []);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading AI recommendations...</p>
          </div>
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary via-green-dark to-primary text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/20 px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">🤖</span>
            <span className="text-sm font-semibold">AI-Powered</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Recommended For You
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Our AI has selected these products based on your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((product) => (
            <div key={product._id || product.id} className="transform hover:scale-105 transition-transform duration-300">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block bg-gold text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gold-light transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AIRecommendations;


