import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView();
    }
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 h-full flex flex-col"
    >
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-300"></div>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {product.discount > 0 && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-gold to-gold-dark text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20 transform group-hover:scale-110 transition-transform">
            -{product.discount}%
          </div>
        )}
        {product.featured && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-semibold shadow-md z-20 flex items-center gap-1 border border-gray-100">
            <span>⭐</span>
            <span>Best Seller</span>
          </div>
        )}
        {/* Quick View Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
          <button
            onClick={handleQuickViewClick}
            className="bg-white text-primary px-6 py-3 rounded-full font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gold hover:text-white pointer-events-auto flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Quick View
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif font-semibold text-primary mb-3 group-hover:text-gold transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-3xl font-bold bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
            PKR {product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-lg text-gray-400 line-through">
              PKR {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 rounded-xl font-semibold hover:from-gold hover:to-gold-dark hover:text-primary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gold/50 flex items-center justify-center gap-2 group/btn"
        >
          <span>Add to Cart</span>
          <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;



