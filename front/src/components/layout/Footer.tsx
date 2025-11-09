'use client';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-white text-gray-500 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-center">
        <p>
          <span className="font-medium text-gray-700">© {year} Prueba BCS</span>. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
