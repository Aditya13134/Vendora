import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Vendor from '@/models/Vendor';

// GET a single vendor by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const vendor = await Vendor.findById(params.id);
    
    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }
    
    return NextResponse.json(vendor);
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return NextResponse.json({ error: 'Failed to fetch vendor' }, { status: 500 });
  }
}

// PUT update a vendor
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.vendorName || !body.bankAccountNo || !body.bankName) {
      return NextResponse.json(
        { error: 'Vendor name, bank account number, and bank name are required' },
        { status: 400 }
      );
    }
    
    const updatedVendor = await Vendor.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedVendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedVendor);
  } catch (error) {
    console.error('Error updating vendor:', error);
    return NextResponse.json({ error: 'Failed to update vendor' }, { status: 500 });
  }
}

// DELETE a vendor
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const deletedVendor = await Vendor.findByIdAndDelete(params.id);
    
    if (!deletedVendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    return NextResponse.json({ error: 'Failed to delete vendor' }, { status: 500 });
  }
}