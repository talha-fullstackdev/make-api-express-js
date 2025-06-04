import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  sold: { type: String },
  reviews: { type: String },
  rating: { type: Number },
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
