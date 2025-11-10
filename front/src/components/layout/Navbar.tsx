'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    router.replace('/login');
  };

  return (
    <nav className="bg-white shadow-sm h-16 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
          aria-label="Abrir menú lateral"
        >
          <Icon icon="mdi:menu" width={26} height={26} />
        </button>

        <button
          onClick={() => router.push('/home')}
          className="p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
          aria-label="Ir al inicio"
        >
          <Icon
            icon="mdi:home-outline"
            width={24}
            height={24}
            className="text-blue-600"
          />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/40"
          alt="Avatar"
          className="w-8 h-8 rounded-full border border-gray-200"
        />

        <button
          onClick={handleLogout}
          className="p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
          aria-label="Cerrar sesión"
        >
          <Icon
            icon="mdi:logout"
            width={22}
            height={22}
            className="text-gray-600 hover:text-red-600 transition-colors"
          />
        </button>
      </div>
    </nav>
  );
}
