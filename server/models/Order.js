 import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  image: {
    type: String,
    default: ''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Making it optional for backward compatibility
  },
  userName: {
    type: String,
    default: 'Guest'
  },
  userEmail: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);