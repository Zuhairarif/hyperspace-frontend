import { Calendar } from 'lucide-react';

const SOURCE_META = {
  'sentinel-2': { label: 'S-2', fullLabel: 'Sentinel-2', color: '#2563EB', offset: 25 },
  'landsat-8': { label: 'L-8', fullLabel: 'Landsat 8', color: '#059669', offset: 50 },
  'isro-resourcesat': { label: 'RS', fullLabel: 'ResourceSat', color: '#D97706', offset: 75 }
};

const TemporalTimeline = ({ startDate, endDate, selectedSources = [] }) => {
  if (!startDate || !endDate || selectedSources.length === 0) return null;

  // Parse dd-mm-yyyy format
  const parseDate = (str) => {
    if (!str) return null;
    const parts = str.split('-');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    return new Date(`${year}-${month}-${day}`);
  };

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) return null;

  const formatShort = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div style={{
      background: 'var(--surface)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      border: '1px solid var(--border-light)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '10px'
      }}>
        <Calendar size={12} color="var(--text-tertiary)" />
        <span style={{
          fontSize: '10px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--text-tertiary)'
        }}>
          Temporal Alignment Window
        </span>
      </div>

      {/* Date range labels */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
        fontSize: '11px',
        fontWeight: '600',
        color: 'var(--text-secondary)'
      }}>
        <span>{formatShort(start)}</span>
        <span>{formatShort(end)}</span>
      </div>

      {/* Timeline bar */}
      <div style={{ position: 'relative', height: '28px' }}>
        {/* Track */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--border)',
          borderRadius: '2px'
        }} />

        {/* Active range fill */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '0%',
          right: '0%',
          height: '4px',
          background: selectedSources.length > 1
            ? 'linear-gradient(90deg, #2563EB, #059669, #D97706)'
            : SOURCE_META[selectedSources[0]]?.color || 'var(--primary)',
          borderRadius: '2px',
          opacity: 0.5
        }} />

        {/* Start marker */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '0%',
          width: '2px',
          height: '12px',
          background: 'var(--text-secondary)',
          borderRadius: '1px'
        }} />

        {/* End marker */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '0%',
          width: '2px',
          height: '12px',
          background: 'var(--text-secondary)',
          borderRadius: '1px'
        }} />

        {/* Satellite position markers */}
        {selectedSources.map((id) => {
          const meta = SOURCE_META[id];
          if (!meta) return null;
          return (
            <div key={id} style={{
              position: 'absolute',
              left: `${meta.offset}%`,
              top: '2px',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px'
            }}>
              {/* Satellite label */}
              <div style={{
                fontSize: '9px',
                fontWeight: '700',
                color: meta.color,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap'
              }}>
                {meta.label}
              </div>
              {/* Dot marker */}
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: meta.color,
                boxShadow: `0 0 0 2px ${meta.color}30`,
                border: '2px solid var(--surface)'
              }} />
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginTop: '8px',
        flexWrap: 'wrap'
      }}>
        {selectedSources.map((id) => {
          const meta = SOURCE_META[id];
          if (!meta) return null;
          return (
            <div key={id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: meta.color
              }} />
              <span style={{
                fontSize: '10px',
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}>
                {meta.fullLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemporalTimeline;
