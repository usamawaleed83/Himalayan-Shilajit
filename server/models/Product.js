import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number, default: 0 },
  images: [{ type: String }],
  description: { type: String, required: true },
  benefits: [{ type: String }],
  ingredients: { type: String },
  usage: { type: String },
  reviews: [reviewSchema],
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  stockQuantity: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);


