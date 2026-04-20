'use client';

export default function Error({ error, reset }) {
  return (
    <div
      style={{
        minHeight: '50vh',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Erro ao mostrar esta parte</h1>
      <p style={{ color: '#555', marginBottom: '1rem', fontSize: '0.9rem' }}>
        {error?.message || 'Ocorreu um erro inesperado.'}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        style={{
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: 6,
          background: '#f5f5f5',
        }}
      >
        Tentar de novo
      </button>
    </div>
  );
}
