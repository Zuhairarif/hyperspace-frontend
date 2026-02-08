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
      {/* Satellite body - central cube */}
      <rect x="16" y="15" width="8" height="10" rx="1.5" fill="#1E3A8A" />
      {/* Body highlight stripe */}
      <rect x="18" y="15" width="2" height="10" rx="0.5" fill="#0EA5E9" opacity="0.5" />

      {/* Left solar panel */}
      <rect x="2" y="17" width="12" height="6" rx="1" fill="#0EA5E9" />
      {/* Left panel grid lines */}
      <line x1="6" y1="17" x2="6" y2="23" stroke="#1E3A8A" strokeWidth="0.5" opacity="0.3" />
      <line x1="10" y1="17" x2="10" y2="23" stroke="#1E3A8A" strokeWidth="0.5" opacity="0.3" />
      <line x1="2" y1="20" x2="14" y2="20" stroke="#1E3A8A" strokeWidth="0.5" opacity="0.3" />
      {/* Left panel arm */}
      <rect x="14" y="19" width="2" height="2" rx="0.3" fill="#1E3A8A" opacity="0.6" />

      {/* Right solar panel */}
      <rect x="26" y="17" width="12" height="6" rx="1" fill="#0EA5E9" />
      {/* Right panel grid lines */}
      <line x1="30" y1="17" x2="30" y2="23" stroke="#1E3A8A" strokeWidth="0.5" opacity="0.3" />
      <line x1="34" y1="17" x2="34" y2="23" stroke="#1E3A8A" strokeWidth="0.5" opacity="0.3" />
      <line x1="26" y1="20" x2="38" y2="20" stroke="#1E3A8A" strokeWidth="0.5" opacity="0.3" />
      {/* Right panel arm */}
      <rect x="24" y="19" width="2" height="2" rx="0.3" fill="#1E3A8A" opacity="0.6" />

      {/* Antenna dish on top */}
      <line x1="20" y1="15" x2="20" y2="10" stroke="#1E3A8A" strokeWidth="1" strokeLinecap="round" />
      <path d="M 16 10 Q 20 6 24 10" stroke="#1E3A8A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Signal waves */}
      <path d="M 17 8 Q 20 5 23 8" stroke="#0EA5E9" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M 18 6 Q 20 3.5 22 6" stroke="#0EA5E9" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.4" />

      {/* Sensor lens on bottom */}
      <circle cx="20" cy="27" r="2" fill="#0EA5E9" />
      <circle cx="20" cy="27" r="1" fill="#1E3A8A" />

      {/* Orbit ring around satellite */}
      <ellipse cx="20" cy="20" rx="19" ry="5" stroke="#0EA5E9" strokeWidth="0.6" fill="none" opacity="0.25"
        transform="rotate(-15, 20, 20)" />
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
