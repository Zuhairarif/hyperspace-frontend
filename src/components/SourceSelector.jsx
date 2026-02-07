import { Activity, Info } from 'lucide-react';

const SOURCES = [
  {
    id: 'sentinel-2',
    name: 'Sentinel-2',
    provider: 'ESA/Copernicus',
    agency: 'ESA',
    resolution: '10m',
    color: 'var(--sentinel-color)',
    colorRaw: '#2563EB',
    badgeClass: 'badge-blue',
    tooltip: 'High-resolution multispectral imaging for vegetation, water, and land monitoring.'
  },
  {
    id: 'landsat-8',
    name: 'Landsat 8',
    provider: 'USGS',
    agency: 'USGS',
    resolution: '30m',
    color: 'var(--landsat-color)',
    colorRaw: '#059669',
    badgeClass: 'badge-green',
    tooltip: 'Long-running Earth observation program with decades of historical data for trend analysis.'
  },
  {
    id: 'isro-resourcesat',
    name: 'ISRO ResourceSat',
    provider: 'ISRO',
    agency: 'ISRO',
    resolution: '23.5m',
    color: 'var(--isro-color)',
    colorRaw: '#D97706',
    badgeClass: 'badge-amber',
    tooltip: 'Indian Remote Sensing satellite providing medium-resolution terrain and resource mapping.'
  }
];

const SourceSelector = ({ selected, onChange, multiple = true }) => {
  const handleToggle = (sourceId) => {
    if (multiple) {
      if (selected.includes(sourceId)) {
        onChange(selected.filter(id => id !== sourceId));
      } else {
        onChange([...selected, sourceId]);
      }
    } else {
      onChange(sourceId);
    }
  };

  const fusionActive = multiple && selected.length > 1;

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '8px'
      }}>
        <label className="label" style={{ margin: 0 }}>Satellite Sources</label>
        {fusionActive && (
          <div className="badge badge-fusion fade-in" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 10px',
            fontSize: '11px'
          }}>
            <Activity size={11} />
            Fusion Active ({selected.length})
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {SOURCES.map((source) => {
          const isSelected = multiple
            ? selected.includes(source.id)
            : selected === source.id;

          return (
            <div
              key={source.id}
              onClick={() => handleToggle(source.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                border: `2px solid ${isSelected ? source.colorRaw : 'var(--border)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                background: isSelected ? `${source.colorRaw}08` : 'var(--surface)',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggle(source.id);
                }
              }}
            >
              {/* Color indicator bar */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: isSelected ? '60%' : '0%',
                background: source.colorRaw,
                borderRadius: '0 2px 2px 0',
                transition: 'height 0.2s ease'
              }} />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    fontWeight: '600',
                    fontSize: '13px',
                    color: 'var(--text-primary)'
                  }}>
                    {source.name}
                  </span>
                  <span className={`badge ${source.badgeClass}`}>
                    {source.agency}
                  </span>
                  <span className="badge" style={{
                    background: 'var(--background)',
                    color: 'var(--text-secondary)'
                  }}>
                    {source.resolution}
                  </span>
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  lineHeight: '1.3'
                }}>
                  {source.provider}
                </div>
              </div>

              {/* Info tooltip */}
              <div className="tooltip-container" onClick={(e) => e.stopPropagation()}>
                <div className="tooltip-trigger">
                  <Info size={9} />
                </div>
                <div className="tooltip-content">
                  {source.tooltip}
                </div>
              </div>

              {/* Checkbox */}
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                border: `2px solid ${isSelected ? source.colorRaw : 'var(--border)'}`,
                background: isSelected ? source.colorRaw : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}>
                {isSelected && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SourceSelector;
