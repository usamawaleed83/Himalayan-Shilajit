# Himalayan Shilajit Backend API

Backend server for Himalayan Shilajit E-Commerce platform with payment integration.

## Features

- RESTful API for products and orders
- Easypaisa payment integration
- Bank transfer payment option
- MongoDB database integration
- Order management system

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
   - MongoDB connection string
   - Easypaisa API credentials
   - Bank account details

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:slug` - Get single product

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:orderNumber` - Get order details
- `PATCH /api/orders/:orderNumber/status` - Update order status

### Payments
- `POST /api/payments/easypaisa/initiate` - Initiate Easypaisa payment
- `POST /api/payments/easypaisa/callback` - Easypaisa payment callback
- `POST /api/payments/bank-transfer/initiate` - Initiate bank transfer
- `POST /api/payments/bank-transfer/verify` - Verify bank transfer
- `GET /api/payments/status/:orderNumber` - Get payment status

## Payment Integration

### Easypaisa
1. Register at Easypaisa Merchant Portal
2. Get Store ID, Account Number, API Key, and API Secret
3. Add credentials to `.env` file
4. Payment flow:
   - Frontend calls `/api/payments/easypaisa/initiate`
   - User completes payment via Easypaisa
   - Easypaisa sends callback to `/api/payments/easypaisa/callback`
   - Order status updated automatically

### Bank Transfer
1. Configure bank details in `.env`
2. Payment flow:
   - Frontend calls `/api/payments/bank-transfer/initiate`
   - User transfers money to provided account
   - Admin verifies payment via `/api/payments/bank-transfer/verify`
   - Order status updated

## Database Setup

### MongoDB Local
1. Install MongoDB
2. Start MongoDB service
3. Update `MONGODB_URI` in `.env`

### MongoDB Atlas (Cloud)
1. Create account at mongodb.com/atlas
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## Environment Variables

See `.env.example` for all required variables.

## Development

The server runs on `http://localhost:5000` by default.

Use `npm run dev` for development with auto-reload (requires nodemon).


