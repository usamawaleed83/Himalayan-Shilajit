# MongoDB Atlas Connection Setup

## ✅ MongoDB Atlas Connected

Your MongoDB Atlas cluster is now configured!

## 🔗 Connection String

```
mongodb+srv://himmachelshilajit:<U123456K!>@cluster0.6rlcjvr.mongodb.net/himalayan-shilajit
```

## 📋 Configuration

### Environment Variable

Add to `server/.env`:
```env
MONGODB_URI=mongodb+srv://himmachelshilajit:<U123456K!>@cluster0.6rlcjvr.mongodb.net/himalayan-shilajit
```

**Important**: Replace `<U123456K!>` with your actual password (without brackets)

## 🗄️ Database Structure

### Collections

1. **products** - All product data
2. **orders** - Customer orders and payment info

### Models

- **Product Model**: Name, price, description, images, benefits, reviews
- **Order Model**: Customer info, items, payment status, order status

## 🚀 Setup Steps

1. **Update .env file**:
   ```bash
   cd server
   cp env.example.txt .env
   # Edit .env and add MongoDB URI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Seed database** (optional):
   ```bash
   node scripts/seedProducts.js
   ```

4. **Start server**:
   ```bash
   npm run dev
   ```

## ✅ Verification

Check connection:
```bash
# Server will log: "MongoDB Connected Successfully"
# If you see this, connection is working!
```

## 🔐 Security Notes

- Connection string includes credentials
- Keep `.env` file secure (never commit to git)
- MongoDB Atlas has built-in security features
- IP whitelist configured in Atlas dashboard

## 📊 MongoDB Flow

1. **Products**: Stored in MongoDB → Fetched by API → Displayed on frontend
2. **Orders**: Created → Saved to MongoDB → Email sent → Status tracked
3. **AI**: Reads from MongoDB → Uses Gemini → Returns recommendations

## 🎯 Features Using MongoDB

- ✅ Product management
- ✅ Order tracking
- ✅ Email triggers (based on MongoDB events)
- ✅ AI recommendations (uses MongoDB product data)
- ✅ Real-time data sync

## ✅ Your MongoDB is Ready!

The connection string is configured. Just:
1. Update `.env` file with the connection string
2. Start the server
3. Products and orders will be stored in MongoDB Atlas!




