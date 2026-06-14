'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUsers } from '@/hooks/useUsers';
import { UsersTable } from '@/components/users/UsersTable/UsersTable';
import { AdminSearchInput } from '@/components/ui/AdminSearchInput/AdminSearchInput';
import { AdminPagination } from '@/components/ui/AdminPagination/AdminPagination';
import { Spinner } from '@/components/ui/Spinner/Spinner';

export default function UsersPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { users, pagination, isLoading } = useUsers({ search: search || undefined, page, limit: 20 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>Foydalanuvchilar</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
          Jami: {pagination?.total ?? 0} ta foydalanuvchi
        </p>
      </div>

      <AdminSearchInput
        value={search}
        onChange={(v) => { setSearch(v); setPage(1); }}
        placeholder="Ism yoki telefon raqami bo'yicha qidirish..."
        style={{ maxWidth: '400px' }}
      />

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <Spinner size="lg" />
        </div>
      ) : (
        <UsersTable
          users={users ?? []}
          onRowClick={(id) => router.push(`/users/${id}`)}
        />
      )}

      {pagination && pagination.totalPages > 1 && (
        <AdminPagination
          currentPage={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
