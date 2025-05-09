'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface Vendor {
  _id: string;
  vendorName: string;
  bankAccountNo: string;
  bankName: string;
  addressLine1?: string;
  city?: string;
  country?: string;
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const vendorsPerPage = 10;

  useEffect(() => {
    fetchVendors();
  }, [currentPage]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/vendors?page=${currentPage}&limit=${vendorsPerPage}`);
      const data = await response.json();
      
      if (response.ok) {
        setVendors(data.vendors);
        setTotalPages(Math.ceil(data.total / vendorsPerPage));
      } else {
        toast.error('Failed to fetch vendors');
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast.error('An error occurred while fetching vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      try {
        const response = await fetch(`/api/vendors/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Vendor deleted successfully');
          fetchVendors();
        } else {
          toast.error('Failed to delete vendor');
        }
      } catch (error) {
        console.error('Error deleting vendor:', error);
        toast.error('An error occurred while deleting the vendor');
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Vendors</h1>
        <Link 
          href="/vendors/new" 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <FiPlus /> Add New Vendor
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : vendors.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">No vendors found</h2>
          <p className="text-gray-600 mb-6">Get started by adding your first vendor</p>
          <Link 
            href="/vendors/new" 
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            <FiPlus /> Add New Vendor
          </Link>
        </div>
      ) : (
        <>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vendors.map((vendor) => (
                    <motion.tr key={vendor._id} variants={itemVariants}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{vendor.vendorName}</div>
                        <div className="text-sm text-gray-500">Acc: {vendor.bankAccountNo.slice(-4).padStart(vendor.bankAccountNo.length, '*')}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vendor.bankName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vendor.city && vendor.country ? `${vendor.city}, ${vendor.country}` : 
                         vendor.city || vendor.country || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link 
                            href={`/vendors/edit/${vendor._id}`}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          >
                            <FiEdit size={18} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(vendor._id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}