'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';
import { ProductsService, OnboardingService } from '@/services/rest.service';
import toast from 'react-hot-toast';
import type { Product } from '@/types/api/products.types';

interface OnboardingFormProps {
  mode: 'create' | 'view';
  id?: string;
  initialData?: any;
}

export default function OnboardingForm({ mode, id, initialData }: OnboardingFormProps) {
  const router = useRouter();
  const { setLoading } = useLoading();

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: initialData?.name || '',
    document: initialData?.document || '',
    email: initialData?.email || '',
    initialAmount: initialData?.initialAmount?.toString() || '',
    productId: initialData?.productId || '',
  });

  const isViewMode = mode === 'view';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductsService.getAll();
        setProducts(res.data || []);
      } catch {
        toast.error('Error al cargar productos');
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isViewMode) return;

    setLoading(true);
    try {
      await OnboardingService.create({
        name: form.name,
        document: form.document,
        email: form.email,
        initialAmount: Number(form.initialAmount),
        productId: form.productId,
      });
      toast.success('Onboarding creado correctamente');
      router.replace('/onboarding');
    } catch {
      toast.error('Error al crear onboarding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={isViewMode}
          className="border rounded-lg px-3 py-2 w-full disabled:bg-gray-100"
          required
        />

        <input
          type="text"
          placeholder="Documento"
          value={form.document}
          onChange={(e) => setForm({ ...form, document: e.target.value })}
          disabled={isViewMode}
          className="border rounded-lg px-3 py-2 w-full disabled:bg-gray-100"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={isViewMode}
          className="border rounded-lg px-3 py-2 w-full disabled:bg-gray-100"
          required
        />

        <input
          type="number"
          placeholder="Monto inicial"
          value={form.initialAmount}
          onChange={(e) => setForm({ ...form, initialAmount: e.target.value })}
          disabled={isViewMode}
          className="border rounded-lg px-3 py-2 w-full disabled:bg-gray-100"
          required
        />
      </div>

      <div>
        <select
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
          disabled={isViewMode}
          className="border rounded-lg px-3 py-2 w-full disabled:bg-gray-100"
          required
        >
          <option value="">Selecciona un producto</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition cursor-pointer"
        >
          {isViewMode ? 'Volver' : 'Cancelar'}
        </button>

        {!isViewMode && (
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
          >
            Guardar
          </button>
        )}
      </div>
    </form>
  );
}
