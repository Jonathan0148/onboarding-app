import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { LoadingProvider } from '@/context/LoadingContext';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import './globals.css';

export const metadata: Metadata = {
  title: 'Onboarding App',
  description: 'App de autenticación y productos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50">
        <LoadingProvider>
          {children}
          <LoadingOverlay />
          <Toaster position="top-right" reverseOrder={false} />
        </LoadingProvider>
      </body>
    </html>
  );
}
