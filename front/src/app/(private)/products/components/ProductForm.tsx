'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';
import type { Product } from '@/types/api/products.types';
import { ProductsService } from '@/services/rest.service';

interface ProductFormProps {
  initialData?: Product | null;
  mode: 'create' | 'edit';
  id?: string;
}

export default function ProductForm({ initialData, mode, id }: ProductFormProps) {
  const router = useRouter();
  const { setLoading } = useLoading();

  const [form, setForm] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    rate: initialData?.rate?.toString() || '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        description: initialData.description,
        rate: initialData.rate.toString(),
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'create') {
        await ProductsService.create({
          name: form.name,
          description: form.description,
          rate: parseFloat(form.rate),
        });
      } else if (mode === 'edit' && id) {
        await ProductsService.update(id, {
          name: form.name,
          description: form.description,
          rate: parseFloat(form.rate),
        });
      }

      setTimeout(() => router.replace('/products'), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Tasa (%)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Ej: 0.5"
            value={form.rate}
            onChange={(e) => setForm({ ...form, rate: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Descripción
        </label>
        <textarea
          placeholder="Descripción del producto"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          rows={3}
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
        >
          {mode === 'create' ? 'Guardar' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  );
}
