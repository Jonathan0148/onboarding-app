'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Menú</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            aria-label="Cerrar menú"
          >
            <Icon icon="mdi:close" width={22} />
          </button>
        </div>

        <nav className="flex flex-col flex-1 p-4 space-y-3">
          <Link
            href="/home"
            onClick={onClose}
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition cursor-pointer"
          >
            <Icon icon="mdi:home-outline" width={20} /> Inicio
          </Link>

          <Link
            href="/products"
            onClick={onClose}
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition cursor-pointer"
          >
            <Icon icon="mdi:shopping-outline" width={20} /> Productos
          </Link>

          <div className="flex-1" />
          
          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.replace('/login');
            }}
            className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition p-2 mt-4 rounded-md cursor-pointer border-t border-gray-200 pt-4"
          >
            <Icon icon="mdi:logout" width={20} /> Cerrar sesión
          </button>
        </nav>
      </aside>
    </>
  );
}
