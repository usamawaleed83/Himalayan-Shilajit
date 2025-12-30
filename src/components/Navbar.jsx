import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount, toggleCart } = useCart();
  const cartCount = getCartItemsCount();

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl group-hover:bg-gold/30 transition-all"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-md">
                <span className="text-xl">🏔️</span>
              </div>
            </div>
            <div className="text-2xl font-serif font-bold text-primary group-hover:text-gold transition-colors tracking-tight">
              Himalayan<span className="text-gold">Shilajit</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {['Home', 'About', 'Products', 'Benefits', 'FAQ', 'Blog', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="relative px-3 py-2 text-primary hover:text-gold transition-colors duration-200 font-medium rounded-lg hover:bg-gold/5 group text-sm uppercase tracking-wide"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-50 rounded-full px-3 py-1.5 border border-gray-200 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold/50 transition-all">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:ring-0 text-sm w-24 focus:w-40 transition-all duration-300 text-primary placeholder-gray-400"
              />
            </div>

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-primary hover:text-gold transition-all duration-200 rounded-lg hover:bg-gold/10 group"
              aria-label="Shopping cart"
            >
              <svg
                className="w-6 h-6 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gold to-gold-dark text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <Link
              to="/products"
              className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-gold to-gold-dark text-white rounded-full font-bold shadow-lg hover:shadow-gold/50 hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              Shop Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-primary hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 space-y-2 border-t border-gray-100">
            {/* Mobile Search */}
            <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 mb-4 mx-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 text-primary"
              />
            </div>

            {['Home', 'About', 'Products', 'Benefits', 'FAQ', 'Blog', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="block px-4 py-2 text-primary hover:text-gold hover:bg-gold/5 rounded-lg transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              to="/products"
              className="block mx-4 mt-4 text-center px-4 py-3 bg-gold text-white rounded-lg font-bold shadow-md hover:bg-gold-dark transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



