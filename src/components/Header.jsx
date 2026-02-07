import { Globe, Activity } from 'lucide-react';

const GeoscopeLogo = () => (
  <div style={{
    width: '40px',
    height: '40px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Scope reticle circle */}
      <circle cx="20" cy="20" r="8" stroke="#1E3A8A" strokeWidth="1.5" fill="none" />
      {/* Crosshair lines */}
      <line x1="20" y1="10" x2="20" y2="15" stroke="#1E3A8A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="25" x2="20" y2="30" stroke="#1E3A8A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10" y1="20" x2="15" y2="20" stroke="#1E3A8A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="25" y1="20" x2="30" y2="20" stroke="#1E3A8A" strokeWidth="1.2" strokeLinecap="round" />
      {/* Central fusion dot */}
      <circle cx="20" cy="20" r="2.2" fill="#0EA5E9" />
      {/* Orbit arc 1 - top-right sweep */}
      <path d="M 32 8 A 16 16 0 0 1 38 20" stroke="#0EA5E9" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Satellite 1 */}
      <rect x="36.5" y="18.5" width="3" height="2" rx="0.5" fill="#0EA5E9" />
      <line x1="38" y1="17.5" x2="38" y2="21.5" stroke="#0EA5E9" strokeWidth="0.8" strokeLinecap="round" />
      {/* Orbit arc 2 - bottom-left sweep */}
      <path d="M 8 32 A 16 16 0 0 1 2 20" stroke="#1E3A8A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Satellite 2 */}
      <rect x="0.5" y="18.5" width="3" height="2" rx="0.5" fill="#1E3A8A" />
      <line x1="2" y1="17.5" x2="2" y2="21.5" stroke="#1E3A8A" strokeWidth="0.8" strokeLinecap="round" />
      {/* Orbit arc 3 - subtle tertiary */}
      <path d="M 10 4 A 16 16 0 0 0 4 14" stroke="#1E3A8A" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
    </svg>
  </div>
);

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
          <GeoscopeLogo />
          <div>
            <h1 style={{
              fontSize: '18px',
              fontWeight: '800',
              margin: 0,
              color: '#1E3A8A',
              letterSpacing: '0.06em',
              lineHeight: '1.2',
              textTransform: 'uppercase'
            }}>
              {'GEO'}
              <span style={{ color: '#0EA5E9', fontWeight: '800' }}>SCOPE</span>
            </h1>
            <p style={{
              fontSize: '10.5px',
              color: 'var(--text-secondary)',
              margin: 0,
              letterSpacing: '0.03em',
              fontWeight: '500'
            }}>
              Unified Multi-Source Earth Observation Dashboard
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Live EO Data indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: 'var(--secondary-light)',
            borderRadius: '100px',
            fontSize: '11px',
            fontWeight: '600',
            color: 'var(--secondary)',
            border: '1px solid rgba(5, 150, 105, 0.15)'
          }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'var(--secondary)',
              boxShadow: '0 0 0 3px rgba(5, 150, 105, 0.2)',
              flexShrink: 0,
              animation: 'pulse 2s ease-in-out infinite'
            }} />
            Live EO Data
          </div>

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
