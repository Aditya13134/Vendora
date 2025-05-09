import Image from "next/image";

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiDatabase, FiUsers, FiBarChart2, FiShield } from 'react-icons/fi';

export default function Home() {
  const features = [
    {
      icon: <FiDatabase className="w-6 h-6" />,
      title: 'Centralized Vendor Database',
      description: 'Store all your vendor information in one secure location for easy access and management.'
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: 'Vendor Relationship Management',
      description: 'Track and manage all your vendor relationships efficiently with our intuitive interface.'
    },
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      title: 'Performance Analytics',
      description: 'Analyze vendor performance with comprehensive reporting and analytics tools.'
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: 'Secure Data Storage',
      description: 'Your vendor data is protected with enterprise-grade security measures.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Streamline Your <span className="text-indigo-600">Vendor Management</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                A comprehensive solution to manage all your vendors in one place. 
                Simplify your procurement process and improve vendor relationships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/vendors" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-colors font-medium text-center">
                  View Vendors
                </Link>
                <Link href="/vendors/new" className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-md transition-colors font-medium text-center">
                  Add New Vendor
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-1/2"
            >
              <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="bg-white/90 p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Vendor Management Dashboard</h3>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                      <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our vendor management system provides everything you need to efficiently manage your vendor relationships.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-indigo-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Start managing your vendors more efficiently today with our comprehensive vendor management system.
            </p>
            <Link href="/vendors/new" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-md transition-colors font-medium inline-block">
              Add Your First Vendor
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
