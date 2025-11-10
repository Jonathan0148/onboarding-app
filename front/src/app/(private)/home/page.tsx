'use client';

import { useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';
import { Icon } from '@iconify/react';

export default function HomePage() {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div
      className="flex flex-col flex-1 bg-gray-100 overflow-hidden"
      style={{ minHeight: 'calc(100vh - 160px)' }}
    >
      <main className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <Icon
          icon="mdi:hand-wave-outline"
          width={60}
          height={60}
          className="text-blue-600 mb-4 animate-bounce"
        />
        <h1 className="text-3xl font-semibold text-gray-800">Bienvenido</h1>
        <p className="text-gray-600 mt-2 max-w-md">
          Has iniciado sesión correctamente. Explora las opciones del menú para gestionar tus productos y configuraciones.
        </p>
      </main>
    </div>
  );
}
