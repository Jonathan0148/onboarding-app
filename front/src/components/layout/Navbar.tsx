'use client';

import { Icon } from '@iconify/react';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm h-16 flex items-center justify-between px-4">
      <button
        onClick={onMenuClick}
        className="p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
        aria-label="Abrir menú lateral"
      >
        <Icon icon="mdi:menu" width={26} height={26} />
      </button>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="Avatar"
          className="w-8 h-8 rounded-full border border-gray-200"
        />
      </div>
    </nav>
  );
}
