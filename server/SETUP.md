# Backend Setup Guide

## ✅ Backend Status: READY

The backend is fully functional and ready to use. Here's what's included:

## 📦 What's Included

### ✅ Complete Features:
1. **Express.js Server** - Fully configured
2. **MongoDB Integration** - Product and Order models
3. **RESTful API Routes** - All endpoints working
4. **Payment Integration** - Easypaisa & Bank Transfer
5. **Order Management** - Create, read, update orders
6. **Error Handling** - Comprehensive error handling
7. **CORS Enabled** - Frontend can connect
8. **Database Seeding** - Script to populate products

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment
```bash
# Copy env.example.txt to .env
cp env.example.txt .env

# Edit .env file with your settings:
# - MongoDB connection string
# - Easypaisa credentials (optional)
# - Bank account details (optional)
```

### 3. Start MongoDB
**Option A: Local MongoDB**
```bash
# Make sure MongoDB is installed and running
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at mongodb.com/atlas
- Create cluster
- Get connection string
- Add to .env: `MONGODB_URI=mongodb+srv://...`

### 4. Seed Database (Optional)
```bash
node scripts/seedProducts.js
```

### 5. Start Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:5000`

## 📡 API Endpoints

### Products
- ✅ `GET /api/products` - Get all products
- ✅ `GET /api/products/featured` - Get featured products
- ✅ `GET /api/products/:slug` - Get single product
- ✅ `POST /api/products` - Create product (admin)

### Orders
- ✅ `POST /api/orders` - Create new order
- ✅ `GET /api/orders/:orderNumber` - Get order details
- ✅ `PATCH /api/orders/:orderNumber/status` - Update order status

### Payments
- ✅ `POST /api/payments/easypaisa/initiate` - Initiate Easypaisa payment
- ✅ `POST /api/payments/easypaisa/callback` - Easypaisa callback
- ✅ `POST /api/payments/bank-transfer/initiate` - Initiate bank transfer
- ✅ `POST /api/payments/bank-transfer/verify` - Verify bank transfer
- ✅ `GET /api/payments/status/:orderNumber` - Get payment status

### Health Check
- ✅ `GET /api/health` - Server health check

## 🔧 Configuration

### Required Environment Variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/himalayan-shilajit
```

### Optional (for payments):
```env
EASYPAISA_STORE_ID=your_store_id
EASYPAISA_ACCOUNT_NUM=your_account_number
EASYPAISA_API_KEY=your_api_key
EASYPAISA_API_SECRET=your_api_secret

BANK_ACCOUNT_NUMBER=1234567890123
BANK_NAME=Your Bank Name
BANK_IBAN=PK00XXXX0000000000000000
BANK_BRANCH=Main Branch
BANK_SWIFT=SWIFTCODE
```

## ✅ Testing the Backend

### Test Health Endpoint:
```bash
curl http://localhost:5000/api/health
```

### Test Products:
```bash
curl http://localhost:5000/api/products
```

### Test Order Creation:
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "03001234567",
      "address": {
        "street": "123 Main St",
        "city": "Karachi",
        "province": "Sindh",
        "postalCode": "75500",
        "country": "Pakistan"
      }
    },
    "items": [
      {
        "productId": "PRODUCT_ID_HERE",
        "quantity": 1
      }
    ],
    "paymentMethod": "easypaisa"
  }'
```

## 🐛 Troubleshooting

### MongoDB Connection Error:
- Make sure MongoDB is running
- Check connection string in .env
- Verify network/firewall settings

### Port Already in Use:
- Change PORT in .env
- Or kill process using port 5000

### Module Not Found:
- Run `npm install` again
- Check Node.js version (should be 14+)

## 📝 Notes

- Backend works without MongoDB (will show connection error but won't crash)
- Payment integrations are ready but need real API credentials
- All endpoints return proper JSON responses
- Error handling is comprehensive
- CORS is enabled for frontend access

## ✅ Backend is READY!

Everything is set up and ready to use. Just:
1. Install dependencies
2. Configure .env
3. Start MongoDB
4. Run the server

That's it! 🎉




