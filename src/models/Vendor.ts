import mongoose, { Schema, Document } from 'mongoose';

export interface IVendor extends Document {
  vendorName: string;
  bankAccountNo: string;
  bankName: string;
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VendorSchema: Schema = new Schema(
  {
    vendorName: { type: String, required: true },
    bankAccountNo: { type: String, required: true },
    bankName: { type: String, required: true },
    addressLine1: { type: String, required: false },
    addressLine2: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
    zipCode: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Vendor || mongoose.model<IVendor>('Vendor', VendorSchema);