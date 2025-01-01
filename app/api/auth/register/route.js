import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();
    const userData = await request.json();
    const { 
      email, 
      emailOtp, 
      phoneOtp, 
      password,
      firstName,
      lastName,
      phone 
    } = userData;

    // Find user with stored OTPs
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Verify OTPs
    if (user.emailOtp !== emailOtp || user.phoneOtp !== phoneOtp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
    }

    // Check OTP expiry
    if (user.otpExpiry < new Date()) {
      return NextResponse.json({ message: 'OTP expired' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user with full details
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        phone,
        password: hashedPassword,
        dateOfActivation: new Date(),
        emailOtp: undefined,
        phoneOtp: undefined,
        otpExpiry: undefined
      },
      { new: true }
    );

    // Remove sensitive data before sending response
    const userResponse = {
      id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      dateOfActivation: updatedUser.dateOfActivation,
      isKycVerified: updatedUser.isKycVerified
    };

    return NextResponse.json({ 
      message: 'User registered successfully',
      user: userResponse
    }, { status: 201 });

  } catch (error) {
    console.error('Error in register:', error);
    return NextResponse.json({ 
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
    }, { status: 500 });
  }
}

// Add OPTIONS method to handle preflight requests
export async function OPTIONS(request) {
  return NextResponse.json({}, { status: 200 });
} 