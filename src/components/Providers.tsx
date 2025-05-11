'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';

/**
 * Root provider component that wraps the application
 * Provides authentication session management and toast notifications
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} Provider wrapped application
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster position="top-center" />
      <Navbar />
      {children}
    </SessionProvider>
  );
}