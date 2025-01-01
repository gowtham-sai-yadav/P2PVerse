import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/db';
import User from '@/models/User';

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    await dbConnect();
    const { email, phone } = await request.json();

    // Generate OTPs
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const phoneOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Store or update user with OTPs
    await User.findOneAndUpdate(
      { email },
      { 
        email,
        phone,
        emailOtp,
        phoneOtp,
        otpExpiry
      },
      { upsert: true }
    );

    // Send email OTP
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for P2PVerse',
        text: `Your OTP is: ${emailOtp}. Valid for 10 minutes.`,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json({ message: 'Failed to send email OTP' }, { status: 500 });
    }

    // In a production environment, integrate with an SMS service
    // For now, log the phone OTP to console
    console.log(`Phone OTP for ${phone}: ${phoneOtp}`);

    return NextResponse.json({ 
      message: 'OTP sent successfully',
      // Include phoneOtp in development for testing
      phoneOtp: process.env.NODE_ENV === 'development' ? phoneOtp : undefined
    }, { status: 200 });

  } catch (error) {
    console.error('Error in sendOtp:', error);
    return NextResponse.json({ 
      message: 'Failed to process request',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
    }, { status: 500 });
  }
}

// Add OPTIONS method to handle preflight requests
export async function OPTIONS(request) {
  return NextResponse.json({}, { status: 200 });
} 