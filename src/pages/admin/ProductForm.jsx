import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../utils/api';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        stockQuantity: '',
        category: 'Resin',
        benefits: '', // Comma separated for input
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`); // Direct fetch for now or add getProductById to api utils
            const data = await response.json(); // Assuming standard response format
            if (data.success) {
                const product = data.data;
                setFormData({
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    stockQuantity: product.stockQuantity,
                    category: product.category || 'Resin',
                    benefits: product.benefits ? product.benefits.join(', ') : '',
                });
                if (product.images && product.images.length > 0) {
                    setImagePreview(product.images[0]);
                }
            }
        } catch (err) {
            setError('Failed to fetch product details');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let imageUrl = imagePreview;

            // 1. Upload Image (if new file selected)
            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('image', imageFile);

                const uploadRes = await fetch('http://localhost:5000/api/products/upload', {
                    method: 'POST',
                    body: uploadData
                });
                const uploadResult = await uploadRes.json();

                if (!uploadResult.success) throw new Error(uploadResult.message || 'Image upload failed');
                imageUrl = uploadResult.imageUrl;
            }

            // 2. Submit Product Data
            const productData = {
                ...formData,
                price: Number(formData.price),
                stockQuantity: Number(formData.stockQuantity),
                benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b),
                images: imageUrl ? [imageUrl] : [],
                slug: formData.name.toLowerCase().replace(/ /g, '-') + '-' + Date.now() // Simple slug generation
            };

            const url = isEditMode
                ? `http://localhost:5000/api/products/${id}`
                : 'http://localhost:5000/api/products';

            const method = isEditMode ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            const result = await response.json();

            if (result.success) {
                navigate('/admin/products');
            } else {
                throw new Error(result.message || 'Failed to save product');
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h2>

            {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (PKR)</label>
                        <input
                            type="number"
                            name="price"
                            required
                            min="0"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                        />
                    </div>
                    {/* Stock */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                        <input
                            type="number"
                            name="stockQuantity"
                            required
                            min="0"
                            value={formData.stockQuantity}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                    ></textarea>
                </div>

                {/* Benefits */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (comma separated)</label>
                    <input
                        type="text"
                        name="benefits"
                        placeholder="Energy Boost, Immune Support, Anti-aging"
                        value={formData.benefits}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gold transition-colors">
                        {imagePreview ? (
                            <div className="relative inline-block">
                                <img src={imagePreview} alt="Preview" className="h-48 object-contain rounded-lg shadow-sm" />
                                <button
                                    type="button"
                                    onClick={() => { setImageFile(null); setImagePreview(null); }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                >
                                    ✕
                                </button>
                                {!imageFile && <p className="text-xs text-gray-500 mt-2">Current Image</p>}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-gray-600 justify-center">
                                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-gold focus-within:outline-none">
                                        <span>Upload a file</span>
                                        <input type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
