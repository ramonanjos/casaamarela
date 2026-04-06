'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <h1 style={{ fontSize: '1.25rem' }}>Erro ao carregar o site</h1>
        <p style={{ color: '#555', marginTop: 12 }}>{error?.message || 'Erro desconhecido.'}</p>
        <button
          type="button"
          onClick={() => reset()}
          style={{ marginTop: 16, padding: '8px 16px', cursor: 'pointer' }}
        >
          Tentar de novo
        </button>
      </body>
    </html>
  );
}
