import { Satellite } from 'lucide-react';

const Header = () => {
  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid var(--border)',
      padding: '16px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px var(--shadow)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            padding: '8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Satellite size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>
              Hyperspace
            </h1>
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              margin: 0
            }}>
              Multi-Satellite Analysis Platform
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{
            padding: '6px 12px',
            background: 'var(--background)',
            borderRadius: '6px',
            fontSize: '12px',
            color: 'var(--text-secondary)'
          }}>
            <span style={{ fontWeight: '600', color: 'var(--primary)' }}>3</span> Satellites
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
