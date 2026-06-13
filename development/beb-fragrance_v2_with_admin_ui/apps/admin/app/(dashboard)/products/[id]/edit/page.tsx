'use client';

import { useParams, useRouter } from 'next/navigation';
import { ProductForm } from '@/components/products/ProductForm/ProductForm';
import { AdminButton } from '@/components/ui/AdminButton/AdminButton';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { useProduct } from '@/hooks/useProduct';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { product, isLoading, updateProduct, isUpdating } = useProduct(id);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>Mahsulot topilmadi</p>
        <AdminButton variant="ghost" onClick={() => router.push('/products')} style={{ marginTop: '12px' }}>
          ← Mahsulotlarga qaytish
        </AdminButton>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <AdminButton variant="ghost" onClick={() => router.back()}>← Orqaga</AdminButton>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700 }}>Mahsulotni tahrirlash</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>{product.name}</p>
        </div>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={async (data) => {
          await updateProduct(data);
          router.push('/products');
        }}
        isLoading={isUpdating}
        submitLabel="Saqlash"
      />
    </div>
  );
}
