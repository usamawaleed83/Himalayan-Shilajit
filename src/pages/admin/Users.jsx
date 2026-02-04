import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, User } from 'lucide-react';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/admin/users', config);
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
                await axios.delete(`http://localhost:5000/api/admin/users/${id}`, config);
                setUsers(users.filter((user) => user._id !== id));
            } catch (error) {
                alert('Failed to delete user');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-bold text-gray-600">User</th>
                            <th className="p-4 font-bold text-gray-600">Email</th>
                            <th className="p-4 font-bold text-gray-600">Role</th>
                            <th className="p-4 font-bold text-gray-600">Joined Date</th>
                            <th className="p-4 font-bold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="p-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                        <User size={16} />
                                    </div>
                                    <span className="font-medium text-gray-900">{user.name}</span>
                                </td>
                                <td className="p-4 text-gray-600">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                        title="Delete User"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersList;
