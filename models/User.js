import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: String,
  emailOtp: String,
  phoneOtp: String,
  otpExpiry: Date,
  dateOfActivation: {
    type: Date,
    default: Date.now,
  },
  isKycVerified: {
    type: Boolean,
    default: false,
  },
  aadharNumber: String,
  panNumber: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema); 