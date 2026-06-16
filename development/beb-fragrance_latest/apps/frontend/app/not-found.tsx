import Link from 'next/link';

export default function NotFound() {
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
      <h1 style={{ fontSize: '72px', marginBottom: '20px', color: '#8b5cf6' }}>
        404
      </h1>
      <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>
        Sahifa topilmadi
      </h2>
      <p style={{ color: '#666', marginBottom: '30px', fontSize: '18px' }}>
        Kechirasiz, siz qidirayotgan sahifa mavjud emas.
      </p>
      <Link
        href="/"
        style={{
          padding: '12px 24px',
          backgroundColor: '#8b5cf6',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '16px',
        }}
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
