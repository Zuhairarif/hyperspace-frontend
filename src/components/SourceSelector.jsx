const SOURCES = [
  {
    id: 'sentinel-2',
    name: 'Sentinel-2',
    provider: 'ESA/Copernicus',
    resolution: '10m',
    color: '#3B82F6',
    icon: '🛰️'
  },
  {
    id: 'landsat-8',
    name: 'Landsat 8',
    provider: 'USGS',
    resolution: '30m',
    color: '#10B981',
    icon: '🛰️'
  },
  {
    id: 'isro-resourcesat',
    name: 'ISRO ResourceSat',
    provider: 'ISRO',
    resolution: '23.5m',
    color: '#F59E0B',
    icon: '🛰️'
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

  return (
    <div>
      <label className="label">Select Satellite Source(s)</label>
      <div style={{ display: 'grid', gap: '12px', marginTop: '8px' }}>
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
                padding: '16px',
                border: `2px solid ${isSelected ? source.color : 'var(--border)'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                background: isSelected ? `${source.color}10` : 'white',
                transition: 'all 0.2s'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: `${source.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                {source.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '2px'
                }}>
                  {source.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  {source.provider} • {source.resolution} resolution
                </div>
              </div>

              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: `2px solid ${isSelected ? source.color : 'var(--border)'}`,
                background: isSelected ? source.color : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isSelected && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
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
