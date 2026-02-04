import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            navigate('/login');
        }
    }, [navigate]);

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
        { path: '/admin/users', icon: Users, label: 'Users' }
    ];

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-primary text-white shadow-xl flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-2xl font-serif font-bold text-gold">Admin Panel</h1>
                    <p className="text-xs text-white/60 mt-1">HerbalSource</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(item.path)
                                ? 'bg-gold text-primary font-bold shadow-lg'
                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-100 transition-all font-medium"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm p-6 sticky top-0 z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">
                            {navItems.find(item => isActive(item.path))?.label || 'Dashboard'}
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary text-gold flex items-center justify-center font-bold">
                                A
                            </div>
                        </div>
                    </div>
                </header>
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
