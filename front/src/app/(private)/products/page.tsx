'use client';

import { useEffect, useState } from 'react';
import { ProductsService } from '@/services/rest.service';
import { useLoading } from '@/context/LoadingContext';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import type { Product } from '@/types/api/products.types';
import PageContainer from '@/components/layout/PageContainer';
import DataTable from '@/components/ui/DataTable';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { setLoading } = useLoading();
  const router = useRouter();

  const fetchProducts = async (term = '', pageNum = 1) => {
    setLoading(true);
    try {
      const res = await ProductsService.getAll({
        page: pageNum,
        limit: 4,
        term: term || undefined,
      });
      setProducts(res.data || []);
      setTotalPages(res.meta?.totalPages || 1);
      setPage(res.meta?.currentPage || 1);
    } catch {
      toast.error('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(search, 1);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    setLoading(true);
    try {
      await ProductsService.remove(selectedId);
      fetchProducts(search, page);
    } catch {
      toast.error('Error al eliminar producto');
    } finally {
      setSelectedId(null);
    }
  };

  const columns = [
    { header: 'Nombre', accessor: 'name' as keyof Product },
    { header: 'Descripción', accessor: 'description' as keyof Product },
    { header: 'Tasa (%)', accessor: 'rate' as keyof Product },
    {
      header: 'Acciones',
      accessor: (p: Product) => (
        <div className="flex justify-center items-center gap-3 py-1">
          <button
            onClick={() => {
              setLoading(true);
              router.push(`/products/${p.id}`);
            }}
            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center shadow-sm hover:shadow-md cursor-pointer"
            title="Editar"
          >
            <Icon icon="mdi:pencil-outline" width="20" height="20" />
          </button>

          <button
            onClick={() => setSelectedId(p.id)}
            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all flex items-center justify-center shadow-sm hover:shadow-md cursor-pointer"
            title="Eliminar"
          >
            <Icon icon="mdi:delete-outline" width="20" height="20" />
          </button>
        </div>
      ),
      className: 'text-center w-[120px]',
    },
  ];

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
            onClick={() => {
              setLoading(true);
              router.push('/products/new');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer flex items-center gap-2"
          >
            <Icon icon="mdi:plus" />
            Nuevo producto
          </button>
        }
      >
        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full max-w-xs focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-1 cursor-pointer"
          >
            <Icon icon="mdi:magnify" width="20" />
            Buscar
          </button>
        </form>

        <DataTable<Product> columns={columns} data={products} />

        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            disabled={page <= 1}
            onClick={() => fetchProducts(search, page - 1)}
            className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
          >
            <Icon icon="mdi:chevron-left" width="20" />
          </button>
          <span className="text-gray-600">
            Página {page} de {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => fetchProducts(search, page + 1)}
            className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
          >
            <Icon icon="mdi:chevron-right" width="20" />
          </button>
        </div>
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
