import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const QuickViewModal = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, quantity);
        setTimeout(() => {
            setIsAdding(false);
            onClose();
        }, 500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden animate-scale-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/2 relative bg-gray-50">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-64 md:h-full object-cover"
                        />
                        {product.discount > 0 && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-gold to-gold-dark text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                -{product.discount}% OFF
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="md:w-1/2 p-8 flex flex-col">
                        <h2 className="text-3xl font-serif font-bold text-primary mb-2">
                            {product.name}
                        </h2>

                        <div className="flex items-center space-x-4 mb-6">
                            <span className="text-3xl font-bold text-gold">
                                PKR {product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xl text-gray-400 line-through">
                                    PKR {product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <div className="prose prose-sm text-gray-600 mb-8 max-h-40 overflow-y-auto custom-scrollbar">
                            <p>{product.description}</p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-gold">✓</span> 100% Pure Himalayan Shilajit
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-gold">✓</span> Lab Tested for Purity
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-gold">✓</span> Rich in Fulvic Acid
                                </li>
                            </ul>
                        </div>

                        <div className="mt-auto space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border border-gray-200 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-2 text-gray-600 hover:text-primary transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-2 text-gray-600 hover:text-primary transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                    className={`flex-1 py-3 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-105 shadow-lg ${isAdding
                                            ? 'bg-green-500 cursor-default'
                                            : 'bg-gradient-to-r from-gold to-gold-dark hover:shadow-gold/50'
                                        }`}
                                >
                                    {isAdding ? 'Added to Cart!' : 'Add to Cart'}
                                </button>
                            </div>

                            <Link
                                to={`/product/${product.slug}`}
                                className="block text-center text-primary hover:text-gold font-medium transition-colors text-sm"
                            >
                                View Full Details →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
