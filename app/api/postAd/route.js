// app/api/postAd/route.js

import { NextResponse } from 'next/server';

// Add this line to make the route dynamic
export const dynamic = 'force-dynamic';

let ads = []; // This should be replaced with actual database logic

export async function GET() {
  return NextResponse.json(ads, { status: 200 });
}

export async function POST(request) {
  try {
    // Use ReadableStream to handle the request body
    const ad = await request.json();
    console.log('Received ad:', ad);

    // Validate the incoming data
    if (!ad.coinType || !ad.price || !ad.quantity || !ad.contactNumber || !ad.email || !ad.action) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Ensure price and quantity are numbers
    if (isNaN(ad.price) || isNaN(ad.quantity)) {
      return NextResponse.json({ message: 'Price and quantity must be numbers' }, { status: 400 });
    }

    ad.id = ads.length + 1; // Simple ID generation
    ads.push(ad);
    
    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error('Error processing POST request:', error.message, error.stack);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
