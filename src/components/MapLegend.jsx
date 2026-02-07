const NDVI_SCALE = [
  { color: '#d73027', label: 'Barren / Water', range: '-1.0 to 0.0' },
  { color: '#fc8d59', label: 'Low Vegetation', range: '0.0 to 0.2' },
  { color: '#fee08b', label: 'Sparse Vegetation', range: '0.2 to 0.4' },
  { color: '#91cf60', label: 'Moderate Vegetation', range: '0.4 to 0.6' },
  { color: '#1a9850', label: 'Dense Vegetation', range: '0.6 to 1.0' }
];

const SOURCE_INDICATORS = {
  'sentinel-2': { label: 'Sentinel-2', color: '#2563EB' },
  'landsat-8': { label: 'Landsat 8', color: '#059669' },
  'isro-resourcesat': { label: 'ISRO ResourceSat', color: '#D97706' }
};

const MapLegend = ({ analysisType, selectedSources }) => {
  const showNDVI = analysisType === 'ndvi';
  const showSources = selectedSources.length > 0;

  if (!showNDVI && !showSources) return null;

  return (
    <div className="map-legend">
      {showSources && (
        <div style={{ marginBottom: showNDVI ? '12px' : '0' }}>
          <h4 style={{
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-tertiary)',
            marginBottom: '8px'
          }}>
            Active Layers
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedSources.map((id) => {
              const source = SOURCE_INDICATORS[id];
              if (!source) return null;
              return (
                <div key={id}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px'
                  }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '2px',
                      background: source.color,
                      boxShadow: `0 0 0 2px ${source.color}30`,
                      flexShrink: 0
                    }} />
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      flex: 1
                    }}>
                      {source.label}
                    </span>
                  </div>
                  {/* Opacity slider */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    paddingLeft: '18px'
                  }}>
                    <span style={{ fontSize: '9px', color: 'var(--text-tertiary)', fontWeight: '500' }}>
                      Opacity
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="70"
                      className="opacity-slider"
                      style={{
                        width: '60px',
                        height: '3px',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        background: `linear-gradient(to right, ${source.color}, ${source.color}40)`,
                        borderRadius: '2px',
                        outline: 'none',
                        cursor: 'pointer',
                        accentColor: source.color
                      }}
                      aria-label={`${source.label} opacity`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showNDVI && (
        <div>
          <h4 style={{
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-tertiary)',
            marginBottom: '8px'
          }}>
            NDVI Scale
          </h4>
          {/* Continuous gradient bar */}
          <div style={{
            height: '8px',
            borderRadius: '4px',
            background: `linear-gradient(to right, ${NDVI_SCALE.map(s => s.color).join(', ')})`,
            marginBottom: '6px'
          }} />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '9px',
            color: 'var(--text-tertiary)',
            fontWeight: '600'
          }}>
            <span>-1.0</span>
            <span>0.0</span>
            <span>0.5</span>
            <span>1.0</span>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            marginTop: '8px'
          }}>
            {NDVI_SCALE.map((item) => (
              <div key={item.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '2px',
                  background: item.color,
                  flexShrink: 0
                }} />
                <span style={{
                  fontSize: '10px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.3'
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapLegend;
