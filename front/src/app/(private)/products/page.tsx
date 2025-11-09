'use client';

import { useEffect, useState } from 'react';
import { ProductsService } from '@/services/rest.service';
import { useLoading } from '@/context/LoadingContext';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import type { Product } from '@/types/api/products.types';
import PageContainer from '@/components/layout/PageContainer';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { setLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await ProductsService.getAll();
        setProducts(res.data || []);
      } catch {
        toast.error('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [setLoading]);

  const handleDelete = async () => {
    if (!selectedId) return;
    setLoading(true);
    try {
      await ProductsService.remove(selectedId);
      setProducts((prev) => prev.filter((x) => x.id !== selectedId));
      toast.success('Producto eliminado correctamente');
    } catch {
      toast.error('Error al eliminar producto');
    } finally {
      setSelectedId(null);
      setLoading(false);
    }
  };

  return (
    <>
      <PageContainer
        title={
          <div className="flex items-center gap-2">
            <Icon icon="mdi:shopping-outline" className="text-blue-600" width={26} />
            <span>Productos</span>
          </div>
        }
        action={
          <button
            onClick={() => router.push('/products/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer flex items-center gap-2"
          >
            <Icon icon="mdi:plus" />
            Nuevo producto
          </button>
        }
      >
        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            No hay productos disponibles.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-100 border-b text-gray-600">
                <tr>
                  <th className="py-3 px-4">Nombre</th>
                  <th className="py-3 px-4">Descripción</th>
                  <th className="py-3 px-4">Tasa (%)</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{p.name}</td>
                    <td className="py-2 px-4">{p.description}</td>
                    <td className="py-2 px-4">{p.rate}</td>
                    <td className="py-2 px-4 text-right">
                      <button
                        onClick={() => router.push(`/products/${p.id}`)}
                        className="text-blue-600 hover:text-blue-800 mx-2 cursor-pointer"
                      >
                        <Icon icon="mdi:pencil-outline" width="20" />
                      </button>
                      <button
                        onClick={() => setSelectedId(p.id)}
                        className="text-red-600 hover:text-red-800 mx-2 cursor-pointer"
                      >
                        <Icon icon="mdi:delete-outline" width="20" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PageContainer>

      <ConfirmDialog
        open={!!selectedId}
        title="Eliminar producto"
        message="¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDelete}
        onCancel={() => setSelectedId(null)}
      />
    </>
  );
}
