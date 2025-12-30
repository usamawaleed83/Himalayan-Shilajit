# 🌱 Seed Products - Quick Guide

## ⚠️ Important: Products Must Be Seeded!

Before creating orders, you **must** seed products into MongoDB.

## 🚀 Quick Seed Command

```bash
cd server
npm run seed
```

This will:
1. Connect to MongoDB
2. Clear existing products
3. Import all products from `src/data/products.json`
4. Set default stock quantities

## ✅ Expected Output

```
Connecting to MongoDB...
✅ Connected to MongoDB
✅ Cleared existing products
✅ Seeded 6 products successfully

📦 Sample products:
  - Premium Himalayan Shilajit Resin (slug: premium-himalayan-shilajit-resin)
  - ...

✅ Seeding complete!
```

## 🔍 Verify Products Are Seeded

After seeding, you can verify by:

1. **Check server logs** - Should show products loaded
2. **Test API endpoint** - `GET http://localhost:5000/api/products`
3. **Check MongoDB** - Products should be in `products` collection

## 🐛 Troubleshooting

### Error: "No products found in database"
- **Solution**: Run `npm run seed` in the `server` folder

### Error: "MongoDB connection failed"
- **Solution**: Check MongoDB connection string in `.env`
- **Solution**: Ensure MongoDB is running (local or Atlas)

### Error: "Product not found" when creating order
- **Solution**: Make sure products are seeded
- **Solution**: Check that product slugs match between JSON and database

## 📝 Manual Seed (Alternative)

If the script doesn't work, you can manually seed:

1. Go to MongoDB Atlas/Compass
2. Select `himalayan-shilajit` database
3. Create `products` collection
4. Import from `src/data/products.json` (remove `id` field first)

## ✅ After Seeding

Once products are seeded, orders will work correctly! The system will:
- Look up products by slug (most reliable)
- Fall back to name if slug not found
- Use MongoDB ObjectIds for product references


