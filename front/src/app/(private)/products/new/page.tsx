'use client';

import PageContainer from '@/components/layout/PageContainer';
import ProductForm from '../components/ProductForm';
import { Icon } from '@iconify/react';

export default function NewProductPage() {
  return (
    <PageContainer
      title={
        <div className="flex items-center gap-2">
          <Icon icon="mdi:plus-box-outline" className="text-blue-600" width={26} />
          <span>Crear producto</span>
        </div>
      }
    >
      <ProductForm mode="create" />
    </PageContainer>
  );
}
