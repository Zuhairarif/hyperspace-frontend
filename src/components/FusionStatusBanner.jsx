import { Activity, Satellite } from 'lucide-react';

const FusionStatusBanner = ({ selectedSources = [] }) => {
  const isFusion = selectedSources.length > 1;

  return (
    <div className="fade-in" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 16px',
      borderRadius: 'var(--radius-md)',
      background: isFusion
        ? 'linear-gradient(135deg, rgba(37,99,235,0.06), rgba(5,150,105,0.06))'
        : 'var(--background)',
      border: isFusion
        ? '1px solid rgba(37,99,235,0.15)'
        : '1px solid var(--border)',
      transition: 'all 0.3s ease'
    }}>
      {/* Status dot */}
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: isFusion ? 'var(--success)' : 'var(--primary)',
        boxShadow: isFusion
          ? '0 0 0 3px rgba(5,150,105,0.2)'
          : '0 0 0 3px rgba(37,99,235,0.15)',
        flexShrink: 0
      }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '13px',
          fontWeight: '700',
          color: isFusion ? 'var(--secondary)' : 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {isFusion ? (
            <>
              <Activity size={13} />
              Unified Fusion Active
            </>
          ) : (
            <>
              <Satellite size={13} />
              Single-Source Analysis Mode
            </>
          )}
        </div>
        <div style={{
          fontSize: '11px',
          color: 'var(--text-tertiary)',
          marginTop: '1px'
        }}>
          {isFusion
            ? `${selectedSources.length} satellite datasets aligned spatially & temporally`
            : selectedSources.length === 1
              ? 'Select additional satellites to enable multi-source fusion'
              : 'Select at least one satellite source to begin'}
        </div>
      </div>

      {/* Satellite count badges */}
      {isFusion && (
        <div style={{
          display: 'flex',
          gap: '3px'
        }}>
          {selectedSources.map((id) => {
            const colors = {
              'sentinel-2': '#2563EB',
              'landsat-8': '#059669',
              'isro-resourcesat': '#D97706'
            };
            return (
              <div key={id} style={{
                width: '6px',
                height: '18px',
                borderRadius: '3px',
                background: colors[id] || 'var(--text-tertiary)',
                opacity: 0.7
              }} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FusionStatusBanner;
