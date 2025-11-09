'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';
import { ProductsService } from '@/services/rest.service';
import PageContainer from '@/components/layout/PageContainer';
import ProductForm from '../components/ProductForm';
import { Icon } from '@iconify/react';
import type { Product } from '@/types/api/products.types';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { setLoading } = useLoading();

  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await ProductsService.getById(id);
        if (res.success) setProduct(res.data);
        else setNotFound(true);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, setLoading]);

  if (notFound) {
    return (
      <PageContainer
        title={
          <div className="flex items-center gap-2">
            <Icon icon="mdi:alert-circle-outline" className="text-red-500" width={26} />
            <span>Producto no encontrado</span>
          </div>
        }
      >
        <div className="text-center text-gray-500 py-10">
          <p className="mb-6 text-lg">
            El producto solicitado no existe o fue eliminado.
          </p>
          <button
            onClick={() => router.replace('/products')}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Volver a productos
          </button>
        </div>
      </PageContainer>
    );
  }

  if (!product) return null;

  return (
    <PageContainer
      title={
        <div className="flex items-center gap-2">
          <Icon icon="mdi:pencil-outline" className="text-blue-600" width={26} />
          <span>Editar producto</span>
        </div>
      }
    >
      <ProductForm mode="edit" id={id} initialData={product} />
    </PageContainer>
  );
}
