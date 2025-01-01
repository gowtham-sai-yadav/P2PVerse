// app/api/postAd/route.js

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Ad from '@/models/Ad';

export async function GET() {
  try {
    await dbConnect();
    // Only fetch open ads
    const ads = await Ad.find({ status: 'open' }).sort({ createdAt: -1 });
    return NextResponse.json(ads, { status: 200 });
  } catch (error) {
    console.error('Error fetching ads:', error);
    return NextResponse.json({ message: 'Failed to fetch ads' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const adData = await request.json();

    // Validate the incoming data
    if (!adData.coinType || !adData.price || !adData.quantity || !adData.contactNumber || !adData.email || !adData.action) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Create new ad document
    const ad = await Ad.create({
      ...adData,
      status: 'open'
    });
    
    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
