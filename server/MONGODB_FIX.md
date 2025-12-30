# 🔧 MongoDB Connection Fix

## ❌ Current Error

```
MongoDB connection error: Error: querySrv ESERVFAIL _mongodb._tcp.cluster0.6rlcjvr.mongodb.net
```

## 🔍 Possible Causes

1. **DNS Resolution Issue** - Network can't resolve MongoDB Atlas hostname
2. **IP Whitelist** - Your IP not allowed in MongoDB Atlas
3. **Connection String Format** - Password encoding issue
4. **Network/Firewall** - Blocking MongoDB connections

## ✅ Solutions

### Solution 1: Check MongoDB Atlas IP Whitelist

1. Go to MongoDB Atlas Dashboard
2. Click "Network Access" → "IP Access List"
3. Add your current IP or `0.0.0.0/0` (for testing - allows all IPs)
4. Wait 1-2 minutes for changes to apply
5. Restart server

### Solution 2: Verify Connection String

Your connection string should be:
```
mongodb+srv://himmachelshilajit:%3CU123456K%21%3E@cluster0.6rlcjvr.mongodb.net/himalayan-shilajit
```

**Important**: 
- Password must be URL-encoded: `<U123456K!>` → `%3CU123456K%21%3E`
- Database name should be included: `/himalayan-shilajit`

### Solution 3: Test Connection String

Update `server/.env`:
```env
MONGODB_URI=mongodb+srv://himmachelshilajit:%3CU123456K%21%3E@cluster0.6rlcjvr.mongodb.net/himalayan-shilajit?retryWrites=true&w=majority
```

### Solution 4: Use Standard Connection (if SRV fails)

If `mongodb+srv://` doesn't work, try getting the standard connection string:

1. MongoDB Atlas → Connect → Connect your application
2. Choose "Standard connection string"
3. Copy and use that instead

### Solution 5: Check Network/Firewall

- Ensure port 27017 is not blocked
- Check if VPN is interfering
- Try different network (mobile hotspot)

## 🧪 Test Connection

### Option 1: Test via MongoDB Compass
1. Download MongoDB Compass
2. Use connection string
3. Test connection

### Option 2: Test via Node.js
```bash
cd server
node -e "const mongoose = require('mongoose'); mongoose.connect('YOUR_CONNECTION_STRING').then(() => console.log('Connected!')).catch(e => console.error(e));"
```

## ✅ Quick Fix Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] IP whitelist includes your IP (or 0.0.0.0/0)
- [ ] Connection string has correct password encoding
- [ ] Database name included in connection string
- [ ] Internet connection is stable
- [ ] No VPN/firewall blocking

## 🔄 After Fixing

Restart server:
```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
Database: himalayan-shilajit
```

## 📝 Note

The server will continue working with "in-memory storage" fallback, but:
- ❌ Data won't persist (lost on restart)
- ❌ No real database storage
- ✅ Good for testing frontend only

For production, **MongoDB connection is required**!


