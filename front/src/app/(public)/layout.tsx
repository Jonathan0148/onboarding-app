'use client';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      {children}
    </main>
  );
}
