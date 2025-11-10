'use client';

import { useEffect, useState } from 'react';
import { ProductsService, OnboardingService } from '@/services/rest.service';
import { useLoading } from '@/context/LoadingContext';
import PageContainer from '@/components/layout/PageContainer';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function NewOnboardingPage() {
  const router = useRouter();
  const { setLoading } = useLoading();
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '',
    document: '',
    email: '',
    initialAmount: '',
    productId: '',
  });

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await ProductsService.getAll();
        setProducts(res.data || []);
      } catch {
        toast.error('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [setLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await OnboardingService.create({
        ...form,
        initialAmount: Number(form.initialAmount),
      });
      router.replace('/onboarding');
    } catch {
      toast.error('Error al crear onboarding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      title={
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/onboarding')}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition cursor-pointer"
            title="Volver a Onboardings"
          >
            <Icon icon="mdi:arrow-left" width={22} height={22} />
          </button>

          <Icon icon="mdi:plus-box-outline" className="text-blue-600" width={26} />
          <span>Crear Onboarding</span>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Documento"
            value={form.document}
            onChange={(e) => setForm({ ...form, document: e.target.value })}
            className="border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            type="number"
            placeholder="Monto inicial"
            value={form.initialAmount}
            onChange={(e) => setForm({ ...form, initialAmount: e.target.value })}
            className="border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <select
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full"
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

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            Guardar
          </button>
        </div>
      </form>
    </PageContainer>
  );
}
