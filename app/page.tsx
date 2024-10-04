// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>PokeAPI Rendering Examples</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <Link href="/csr">
          <button style={buttonStyle}>CSR</button>
        </Link>
        <Link href="/ssr">
          <button style={buttonStyle}>SSR</button>
        </Link>
        <Link href="/ssg">
          <button style={buttonStyle}>SSG</button>
        </Link>
        <Link href="/isr">
          <button style={buttonStyle}>ISR</button>
        </Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '18px',
  cursor: 'pointer',
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
};
