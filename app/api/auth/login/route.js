import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Create user session data (excluding sensitive information)
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      isKycVerified: user.isKycVerified
    };

    return NextResponse.json({ 
      message: 'Login successful',
      user: userData
    }, { status: 200 });

  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json({ 
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
    }, { status: 500 });
  }
}

// Add OPTIONS method to handle preflight requests
export async function OPTIONS(request) {
  return NextResponse.json({}, { status: 200 });
} 