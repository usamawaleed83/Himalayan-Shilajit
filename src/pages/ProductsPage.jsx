import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import AIChatbot from '../components/AIChatbot';
import ProductCard from '../components/ProductCard';
import { api } from '../utils/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Try to fetch from API, fallback to local JSON
        try {
          const response = await api.getProducts();
          if (response.success && response.data.length > 0) {
            setProducts(response.data);
          } else {
            // Fallback to local data
            const localData = await import('../data/products.json');
            setProducts(localData.default);
          }
        } catch (error) {
          // Fallback to local data if API fails
          const localData = await import('../data/products.json');
          setProducts(localData.default);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-600">
            Explore our complete collection of premium Himalayan Shilajit products
          </p>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
      <CartDrawer />
      <AIChatbot />
    </div>
  );
};

export default ProductsPage;



