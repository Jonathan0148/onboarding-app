'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';

export default function UnauthorizedPage() {
  const router = useRouter();
  const { setLoading } = useLoading();

  const handleGoToLogin = () => {
    setLoading(true);
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl shadow-md w-full max-w-md">
      <Icon icon="mdi:lock-alert-outline" width={64} className="text-red-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Acceso denegado</h1>
      <p className="text-gray-600 mb-6">
        No tienes permisos para acceder a esta página o tu sesión ha expirado.
      </p>
      <button
        onClick={handleGoToLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer flex items-center gap-2"
      >
        <Icon icon="mdi:arrow-left" width={20} />
        Volver al inicio de sesión
      </button>
    </div>
  );
}
