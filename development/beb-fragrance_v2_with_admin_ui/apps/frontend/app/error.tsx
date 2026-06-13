'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          padding: '20px',
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>
            Xatolik yuz berdi 😞
          </h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            {error.message || 'Noto\'xta narsa sodir bo\'ldi'}
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
            Qayta urinib ko\'rish
          </button>
        </div>
      </body>
    </html>
  );
}
