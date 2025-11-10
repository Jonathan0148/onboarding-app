import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Portal Administrativo',
  description: 'Aplicación de prueba técnica para la gestión de productos y usuarios en Banco Davivienda.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
