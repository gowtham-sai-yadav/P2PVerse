import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Ad from '@/models/Ad';

export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const { adId } = params;
    const { status } = await request.json();

    const validStatuses = ['open', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

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
    console.error('Error updating ad status:', error);
    return NextResponse.json({ message: 'Failed to update ad status' }, { status: 500 });
  }
} 