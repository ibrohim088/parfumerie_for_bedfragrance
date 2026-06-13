'use client';

import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/products/ProductForm/ProductForm';
import { AdminButton } from '@/components/ui/AdminButton/AdminButton';
import { useProducts } from '@/hooks/useProducts';

export default function NewProductPage() {
  const router = useRouter();
  const { createProduct, isCreating } = useProducts();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <AdminButton variant="ghost" onClick={() => router.back()}>← Orqaga</AdminButton>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700 }}>Yangi mahsulot</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            Yangi atir mahsulotini qo'shish
          </p>
        </div>
      </div>

      <ProductForm
        onSubmit={async (data) => {
          await createProduct(data);
          router.push('/products');
        }}
        isLoading={isCreating}
        submitLabel="Mahsulot qo'shish"
      />
    </div>
  );
}
