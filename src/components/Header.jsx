import { Satellite, Globe, Activity } from 'lucide-react';

const Header = ({ selectedSourcesCount = 0 }) => {
  return (
    <header style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      padding: '0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px var(--shadow)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            padding: '9px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Satellite size={20} color="white" />
          </div>
          <div>
            <h1 style={{
              fontSize: '18px',
              fontWeight: '700',
              margin: 0,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: '1.2'
            }}>
              Hyperspace
            </h1>
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              margin: 0,
              letterSpacing: '0.01em'
            }}>
              Unified Multi-Satellite Analysis Platform
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: 'var(--background)',
            borderRadius: '100px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-light)'
          }}>
            <Globe size={13} color="var(--primary)" />
            <span style={{ fontWeight: '600', color: 'var(--primary)' }}>3</span>
            <span>Satellites</span>
          </div>

          {selectedSourcesCount > 1 && (
            <div className="fade-in" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: 'linear-gradient(135deg, var(--primary-light), var(--secondary-light))',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--primary-dark)',
              border: '1px solid rgba(37, 99, 235, 0.15)'
            }}>
              <Activity size={13} />
              Fusion Active
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
