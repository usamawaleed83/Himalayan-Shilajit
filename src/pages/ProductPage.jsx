import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import AIChatbot from '../components/AIChatbot';
import { useCart } from '../contexts/CartContext';
import productsData from '../data/products.json';

const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/products');
    }
  }, [slug, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <a href="/" className="hover:text-gold transition-colors">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/products" className="hover:text-gold transition-colors">
                Products
              </a>
            </li>
            <li>/</li>
            <li className="text-primary font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index ? 'border-gold' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-primary">PKR {product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    PKR {product.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-gold text-primary px-3 py-1 rounded-full text-sm font-bold">
                    Save {product.discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-primary mb-2">Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={decreaseQuantity}
                  className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-gold hover:bg-gold-light transition-colors"
                  aria-label="Decrease quantity"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-2xl font-bold text-primary w-16 text-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-gold hover:bg-gold-light transition-colors"
                  aria-label="Increase quantity"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                product.inStock
                  ? 'bg-primary text-white hover:bg-gold hover:text-primary transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Product Info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free Shipping on Orders Over PKR 50</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>100% Authentic Himalayan Shilajit</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>30-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'description'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-gray-500 hover:text-primary'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'benefits'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-gray-500 hover:text-primary'
                }`}
              >
                Benefits
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-gray-500 hover:text-primary'
                }`}
              >
                Reviews ({product.reviews.length})
              </button>
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Product Details</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Ingredients</h3>
                  <p className="text-gray-600">{product.ingredients}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Usage Instructions</h3>
                  <p className="text-gray-600">{product.usage}</p>
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg
                        className="w-6 h-6 text-gold flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-primary">{review.name}</h4>
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < review.rating ? 'text-gold' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <CartDrawer />
      <AIChatbot />
    </div>
  );
};

export default ProductPage;



