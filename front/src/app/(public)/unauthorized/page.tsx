'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl shadow-md w-full max-w-md">
      <Icon icon="mdi:lock-alert-outline" width={64} className="text-red-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Acceso denegado</h1>
      <p className="text-gray-600 mb-6">
        No tienes permisos para acceder a esta página o tu sesión ha expirado.
      </p>
      <Link
        href="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Volver al inicio de sesión
      </Link>
    </div>
  );
}
