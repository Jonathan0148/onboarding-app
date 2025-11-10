'use client';

import PageContainer from '@/components/layout/PageContainer';
import ProductForm from '../components/ProductForm';
import { Icon } from '@iconify/react';
import { useLoading } from '@/context/LoadingContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const { setLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <PageContainer
      title={
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/products')}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition cursor-pointer"
            title="Volver a productos"
          >
            <Icon icon="mdi:arrow-left" width={22} height={22} />
          </button>

          <Icon icon="mdi:plus-box-outline" className="text-blue-600" width={26} />
          <span>Crear producto</span>
        </div>
      }
    >
      <ProductForm mode="create" />
    </PageContainer>
  );
}
