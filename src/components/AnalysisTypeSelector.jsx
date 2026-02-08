import { Layers, TrendingUp, GitCompare } from 'lucide-react';

const ANALYSIS_TYPES = [
  {
    id: 'landcover',
    label: 'Land Cover Classification',
    description: 'Surface classification using satellite imagery',
    icon: Layers,
    color: 'var(--secondary)'
  },
  {
    id: 'ndvi',
    label: 'NDVI Analysis',
    description: 'Vegetation health comparison across satellites',
    icon: TrendingUp,
    color: 'var(--success)'
  },
  {
    id: 'compare',
    label: 'Compare Sources',
    description: 'Unified multi-satellite fusion and overlay',
    icon: GitCompare,
    color: 'var(--primary)'
  }
];

const AnalysisTypeSelector = ({ value, onChange }) => {
  return (
    <div>
      <label className="label">Analysis Type</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {ANALYSIS_TYPES.map((type) => {
          const isSelected = value === type.id;
          const Icon = type.icon;
          return (
            <div
              key={type.id}
              onClick={() => onChange(type.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                background: isSelected ? 'var(--primary-light)' : 'var(--surface)',
                transition: 'all 0.2s ease'
              }}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onChange(type.id);
                }
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                background: isSelected ? 'var(--primary)' : 'var(--background)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}>
                <Icon
                  size={16}
                  color={isSelected ? 'white' : 'var(--text-secondary)'}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: isSelected ? 'var(--primary-dark)' : 'var(--text-primary)',
                  marginBottom: '1px'
                }}>
                  {type.label}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: isSelected ? 'var(--primary)' : 'var(--text-tertiary)',
                  lineHeight: '1.3'
                }}>
                  {type.description}
                </div>
              </div>
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s ease'
              }}>
                {isSelected && (
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--primary)'
                  }} />
                )}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default AnalysisTypeSelector;
