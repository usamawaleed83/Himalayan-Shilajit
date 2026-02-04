'use client';

import React from 'react';
import AdminLayout from '../components/admin/AdminLayout';

const AdminLayoutPage = ({ children }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminLayoutPage;