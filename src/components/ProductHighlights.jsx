import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { api } from '../utils/api';

const ProductHighlights = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Try to fetch from API, fallback to local JSON
        try {
          const response = await api.getFeaturedProducts();
          if (response.success && response.data.length > 0) {
            setFeaturedProducts(response.data);
          } else {
            // Fallback to local data
            const localData = await import('../data/products.json');
            setFeaturedProducts(localData.default.filter(p => p.featured));
          }
        } catch (error) {
          // Fallback to local data if API fails
          const localData = await import('../data/products.json');
          setFeaturedProducts(localData.default.filter(p => p.featured));
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold font-medium tracking-wider uppercase text-sm mb-2 block">Premium Selection</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Featured Products
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of authentic Himalayan Shilajit products, sourced from the highest altitudes.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                onQuickView={() => handleQuickView(product)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <React.Suspense fallback={null}>
          <div className={isModalOpen ? 'block' : 'hidden'}>
            <QuickViewModal
              product={selectedProduct}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </React.Suspense>
      )}
    </section>
  );
};
import QuickViewModal from './QuickViewModal';

export default ProductHighlights;



