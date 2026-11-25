export default function NotFound() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#07140e', color: '#f5ead1', fontFamily: 'var(--font-serif)' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 400, marginBottom: '16px' }}>Page Not Found</h1>
        <p style={{ color: '#aaa998', fontSize: '15px' }}>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

