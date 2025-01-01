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
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  try {
    await dbConnect();
    const adData = await request.json();

    if (!adData.coinType || !adData.price || !adData.quantity || !adData.contactNumber || !adData.email || !adData.action) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const ad = await Ad.create({
      ...adData,
      status: 'open'
    });
    
    clearTimeout(timeoutId);
    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Error processing POST request:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
