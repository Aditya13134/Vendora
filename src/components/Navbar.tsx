'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navigation bar component that handles site navigation and authentication state
 * Includes responsive design with mobile menu support
 * @returns {JSX.Element} Navigation bar with authentication controls
 */
const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Toggles the mobile menu state
   */
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            Vendora
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link href="/vendors" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Vendors
            </Link>
            <Link href="/vendors/new" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Add Vendor
            </Link>
            
            {status === 'authenticated' ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {session?.user?.name || 'User'}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Login with Google
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-indigo-600 transition-colors">
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-3">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-indigo-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/vendors" 
                  className="text-gray-700 hover:text-indigo-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Vendors
                </Link>
                <Link 
                  href="/vendors/new" 
                  className="text-gray-700 hover:text-indigo-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Vendor
                </Link>
                
                {status === 'authenticated' ? (
                  <div className="flex flex-col space-y-3">
                    <span className="text-sm text-gray-600">
                      {session?.user?.name || 'User'}
                    </span>
                    <button
                      onClick={() => signOut()}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors w-full"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => signIn('google')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors w-full"
                  >
                    Login with Google
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;