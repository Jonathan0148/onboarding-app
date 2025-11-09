'use client';

export default function HomePage() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="flex flex-col flex-1">
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
