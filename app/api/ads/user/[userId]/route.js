import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Ad from '@/models/Ad';

export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const { adId } = params;
    const { status } = await request.json();
    
    const updatedAd = await Ad.findByIdAndUpdate(
      adId,
      { status },
      { new: true }
    );
    
    if (!updatedAd) {
      return NextResponse.json({ message: 'Ad not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedAd, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update ad' }, { status: 500 });
  }
} 

export async function GET(request, { params }) {
    try {
      await dbConnect();
      const { userId } = params;
      
      const ads = await Ad.find({ userId }).sort({ createdAt: -1 });
      
      return NextResponse.json(ads, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Failed to fetch ads' }, { status: 500 });
    }
  }