import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Vendor from '@/models/Vendor';

/**
 * Retrieves a paginated list of vendors
 * @param {NextRequest} request - The incoming HTTP request
 * @returns {Promise<NextResponse>} JSON response with vendors and pagination data
 */
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    const vendors = await Vendor.find({}).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Vendor.countDocuments({});
    
    return NextResponse.json({
      vendors,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 });
  }
}

/**
 * Creates a new vendor
 * @param {NextRequest} request - The incoming HTTP request with vendor data
 * @returns {Promise<NextResponse>} JSON response with created vendor or error
 */
export async function POST(request: NextRequest) {
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
    
    const newVendor = await Vendor.create(body);
    return NextResponse.json(newVendor, { status: 201 });
  } catch (error) {
    console.error('Error creating vendor:', error);
    return NextResponse.json({ error: 'Failed to create vendor' }, { status: 500 });
  }
}