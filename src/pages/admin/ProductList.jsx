import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.getProducts();
            if (response.success) {
                setProducts(response.data);
            } else {
                setError('Failed to fetch products');
            }
        } catch (err) {
            setError('Error loading products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (data.success) {
                    setProducts(products.filter(p => p._id !== id));
                } else {
                    alert('Failed to delete product');
                }
            } catch (err) {
                alert('Error deleting product');
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading products...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                <Link
                    to="/admin/products/new"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <span>+</span> Add Product
                </Link>
            </div>

            {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">{error}</div>}

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="py-4 px-4 font-semibold text-gray-600">Image</th>
                            <th className="py-4 px-4 font-semibold text-gray-600">Name</th>
                            <th className="py-4 px-4 font-semibold text-gray-600">Price</th>
                            <th className="py-4 px-4 font-semibold text-gray-600">Stock</th>
                            <th className="py-4 px-4 font-semibold text-gray-600">Category</th>
                            <th className="py-4 px-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50 bg-white">
                                <td className="py-3 px-4">
                                    <img
                                        src={product.images?.[0] || 'https://via.placeholder.com/50'}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                                    />
                                </td>
                                <td className="py-3 px-4 font-medium text-gray-800">{product.name}</td>
                                <td className="py-3 px-4 text-gray-600">PKR {product.price}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.stockQuantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {product.stockQuantity} in stock
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-gray-500 text-sm">
                                    {product.featured && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mr-2">Featured</span>}
                                </td>
                                <td className="py-3 px-4 text-right space-x-2">
                                    <Link
                                        to={`/admin/products/edit/${product._id}`}
                                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-500 hover:text-red-700 font-medium text-sm ml-4"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="6" className="py-8 text-center text-gray-500">
                                    No products found. Add your first product!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
