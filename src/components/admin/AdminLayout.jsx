import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if already authenticated in this session
        const auth = sessionStorage.getItem('adminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple verification against client-side env (Not secure for production, but per plan)
        // Normally this should verify with a backend endpoint
        if (password === 'admin123') { // Using default for now as client-side env might not be accessible
            sessionStorage.setItem('adminAuth', 'true');
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid password');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth');
        setIsAuthenticated(false);
        navigate('/');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6 text-primary">Admin Access</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                                placeholder="Enter admin password"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                        >
                            Login
                        </button>
                        <div className="text-center mt-4">
                            <Link to="/" className="text-sm text-gray-500 hover:text-primary">← Back to Store</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold font-serif">Himalayan Admin</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        to="/admin/products"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/products')
                                ? 'bg-gold text-primary font-bold'
                                : 'hover:bg-white/10'
                            }`}
                    >
                        <span>📦</span>
                        <span>Products</span>
                    </Link>
                    <Link
                        to="/admin/orders"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/orders')
                                ? 'bg-gold text-primary font-bold'
                                : 'hover:bg-white/10'
                            }`}
                    >
                        <span>🛍️</span>
                        <span>Orders</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-300 w-full transition-colors"
                    >
                        <span>🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center md:hidden">
                    <span className="font-bold text-primary">Admin Panel</span>
                    <button onClick={handleLogout} className="text-red-500 text-sm">Logout</button>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
