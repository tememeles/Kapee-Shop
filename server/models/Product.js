import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
    trim: true
  },
  productdescrib: {
    type: String,
    required: true
  },
  productprice: {
    type: Number,
    required: true,
    min: 0
  },
  productquantity: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    default: "Electronics"
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);