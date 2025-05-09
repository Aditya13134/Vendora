'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiSave, FiArrowLeft } from 'react-icons/fi';

interface FormData {
  vendorName: string;
  bankAccountNo: string;
  bankName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  zipCode: string;
}

export default function NewVendorPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    vendorName: '',
    bankAccountNo: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    zipCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.vendorName || !formData.bankAccountNo || !formData.bankName) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Vendor created successfully');
        router.push('/vendors');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to create vendor');
      }
    } catch (error) {
      console.error('Error creating vendor:', error);
      toast.error('An error occurred while creating the vendor');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8">
      <div className="mb-8">
        <Link 
          href="/vendors" 
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
        >
          <FiArrowLeft /> Back to Vendors
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-100"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Add New Vendor</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vendor Name */}
            <div>
              <label htmlFor="vendorName" className="block text-sm font-semibold text-gray-900 mb-2">
                Vendor Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="vendorName"
                name="vendorName"
                value={formData.vendorName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 ease-in-out hover:border-indigo-300"
                required
              />
            </div>

            {/* Bank Name */}
            <div>
              <label htmlFor="bankName" className="block text-sm font-semibold text-gray-900 mb-2">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 ease-in-out hover:border-indigo-300"
                required
              />
            </div>

            {/* Bank Account Number */}
            <div>
              <label htmlFor="bankAccountNo" className="block text-sm font-semibold text-gray-900 mb-2">
                Bank Account Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="bankAccountNo"
                name="bankAccountNo"
                value={formData.bankAccountNo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 ease-in-out hover:border-indigo-300"
                required
              />
            </div>

            {/* Address Line 1 */}
            <div>
              <label htmlFor="addressLine1" className="block text-sm font-semibold text-gray-900 mb-2">
                Address Line 1
              </label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 ease-in-out hover:border-indigo-300"
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <label htmlFor="addressLine2" className="block text-sm font-semibold text-gray-900 mb-2">
                Address Line 2
              </label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 ease-in-out hover:border-indigo-300"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 ease-in-out hover:border-indigo-300"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm font-semibold text-gray-900 mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 ease-in-out hover:border-indigo-300"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-900 mb-2">
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 ease-in-out hover:border-indigo-300"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Link 
              href="/vendors"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium hover:shadow-md"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-200 disabled:bg-indigo-400 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow-md"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave />
                  Save Vendor
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}