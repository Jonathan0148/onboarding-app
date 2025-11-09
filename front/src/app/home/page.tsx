'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useLoading } from '@/context/LoadingContext';

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-semibold text-gray-800">Bienvenido 👋</h1>
          <p className="text-gray-600 mt-2">
            Has iniciado sesión correctamente. Explora las opciones del menú.
          </p>
        </main>
      </div>
    </div>
  );
}
