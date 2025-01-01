import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  coinType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: ['buy', 'sell'],
  },
  status: {
    type: String,
    enum: ['open', 'completed', 'cancelled'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Ad || mongoose.model('Ad', AdSchema); 