import { Globe, Activity } from 'lucide-react';

const OrbitalLogo = () => (
  <div style={{
    width: '38px',
    height: '38px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      {/* Core dot */}
      <circle cx="19" cy="19" r="4" fill="url(#coreGrad)" />
      {/* Orbit 1 - Sentinel (blue) */}
      <ellipse cx="19" cy="19" rx="14" ry="6" stroke="#2563EB" strokeWidth="1.5" opacity="0.6"
        transform="rotate(-20, 19, 19)" />
      <circle cx="31" cy="15" r="2.5" fill="#2563EB" />
      {/* Orbit 2 - Landsat (green) */}
      <ellipse cx="19" cy="19" rx="14" ry="6" stroke="#059669" strokeWidth="1.5" opacity="0.6"
        transform="rotate(30, 19, 19)" />
      <circle cx="8" cy="13" r="2.5" fill="#059669" />
      {/* Orbit 3 - ISRO (amber) */}
      <ellipse cx="19" cy="19" rx="14" ry="6" stroke="#D97706" strokeWidth="1.5" opacity="0.6"
        transform="rotate(80, 19, 19)" />
      <circle cx="14" cy="32" r="2.5" fill="#D97706" />
      <defs>
        <radialGradient id="coreGrad">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#059669" />
        </radialGradient>
      </defs>
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
          <OrbitalLogo />
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
              fontSize: '11px',
              color: 'var(--text-secondary)',
              margin: 0,
              letterSpacing: '0.02em',
              fontWeight: '500'
            }}>
              Unified Multi-Satellite Intelligence Platform
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
