'use client';

/**
 * @fileoverview Edit Vendor Page Component
 * This file contains the implementation of the Edit Vendor page where users can modify
 * existing vendor information. It fetches the current vendor data and provides a form
 * interface for updating vendor details including name, bank information, and address.
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiSave, FiArrowLeft } from 'react-icons/fi';

/**
 * @interface FormData
 * @description Interface defining the structure of vendor form data
 */
interface FormData {
  /** The name of the vendor */
  vendorName: string;
  /** The vendor's bank account number */
  bankAccountNo: string;
  /** The name of the vendor's bank */
  bankName: string;
  /** Primary address line */
  addressLine1: string;
  /** Secondary address line (optional) */
  addressLine2: string;
  /** City name */
  city: string;
  /** Country name */
  country: string;
  /** Postal/ZIP code */
  zipCode: string;
}

/**
 * @component EditVendorPage
 * @description A React component that renders a form for editing existing vendors.
 * It fetches the vendor's current data, allows modifications, and handles form submission.
 * @param {Object} props - Component props
 * @param {Object} props.params - URL parameters
 * @param {string} props.params.id - The ID of the vendor being edited
 * @returns {JSX.Element} The rendered edit vendor form page
 */
export default function EditVendorPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/vendors/${id}`);
        
        if (response.ok) {
          const vendor = await response.json();
          setFormData({
            vendorName: vendor.vendorName || '',
            bankAccountNo: vendor.bankAccountNo || '',
            bankName: vendor.bankName || '',
            addressLine1: vendor.addressLine1 || '',
            addressLine2: vendor.addressLine2 || '',
            city: vendor.city || '',
            country: vendor.country || '',
            zipCode: vendor.zipCode || ''
          });
        } else {
          toast.error('Failed to fetch vendor details');
          router.push('/vendors');
        }
      } catch (error) {
        console.error('Error fetching vendor:', error);
        toast.error('An error occurred while fetching vendor details');
        router.push('/vendors');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendor();
  }, [id, router]);

  /**
   * @function handleChange
   * @description Handles input field changes and updates the form state
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event object
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * @function handleSubmit
   * @description Handles form submission, validates required fields, and sends updated data to the API
   * @param {React.FormEvent} e - The form submission event
   * @async
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.vendorName || !formData.bankAccountNo || !formData.bankName) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/vendors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Vendor updated successfully');
        router.push('/vendors');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to update vendor');
      }
    } catch (error) {
      console.error('Error updating vendor:', error);
      toast.error('An error occurred while updating the vendor');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Vendor</h1>
        
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
                  Update Vendor
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}