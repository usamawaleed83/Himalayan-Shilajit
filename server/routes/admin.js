import express from 'express';
import PDFDocument from 'pdfkit';
import { protect, admin } from '../middleware/authMiddleware.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

const router = express.Router();

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find();
        const products = await Product.find();
        const users = await User.find({ role: 'customer' });

        const totalRevenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);
        const paidOrders = orders.filter(order => order.paymentStatus === 'completed').length;
        const pendingOrders = orders.filter(order => order.orderStatus === 'pending').length;

        // Top selling products logic (simplified)
        const productSales = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
            });
        });

        const topProducts = Object.entries(productSales)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, quantity]) => ({ name, quantity }));

        res.json({
            totalRevenue,
            totalOrders: orders.length,
            totalProducts: products.length,
            totalUsers: users.length,
            paidOrders,
            pendingOrders,
            topProducts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
router.get('/orders', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
router.put('/orders/:id/status', protect, admin, async (req, res) => {
    try {
        const { status, trackingNumber } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            order.orderStatus = status || order.orderStatus;
            if (trackingNumber) {
                order.trackingNumber = trackingNumber;
            }
            if (status === 'delivered') {
                order.paymentStatus = 'completed'; // Auto-complete payment on delivery if COD
            }

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Generate Invoice PDF
// @route   GET /api/admin/orders/:id/invoice
// @access  Private/Admin
router.get('/orders/:id/invoice', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invoice-${order.orderNumber}.pdf`);

        doc.pipe(res);

        // Invoice Header
        doc.fontSize(20).text('Himalayan Shilajit - Invoice', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Order #: ${order.orderNumber}`);
        doc.text(`Date: ${order.createdAt.toLocaleDateString()}`);
        doc.text(`Status: ${order.orderStatus}`);
        doc.moveDown();

        // Customer Details
        doc.text(`Customer: ${order.customer.name}`);
        doc.text(`Phone: ${order.customer.phone}`);
        doc.text(`Address: ${order.customer.address.street}, ${order.customer.address.city}`);
        doc.moveDown();

        // Items Table Header
        doc.text('Items:', { underline: true });
        doc.moveDown(0.5);

        // Items List
        order.items.forEach(item => {
            doc.text(`${item.name} x ${item.quantity} - Rs. ${item.price * item.quantity}`);
        });

        doc.moveDown();
        doc.text(`Subtotal: Rs. ${order.subtotal}`);
        doc.text(`Shipping: Rs. ${order.shipping}`);
        doc.fontSize(14).text(`Total: Rs. ${order.total}`, { bold: true });

        doc.end();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, admin, async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
router.delete('/users/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
