'use client';

import { useEffect } from 'react';
import { Frown } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px',
    }}>
      <Frown size={40} style={{ marginBottom: '12px', color: '#666' }} />
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>
        Xatolik yuz berdi
      </h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        {error.message || "Noma'lum xatolik yuz berdi"}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#8b5cf6',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Qayta urinib ko'rish
      </button>
    </div>
  );
}
