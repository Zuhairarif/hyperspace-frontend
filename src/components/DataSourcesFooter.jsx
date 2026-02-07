import { Database } from 'lucide-react';

const DataSourcesFooter = () => {
  return (
    <footer style={{
      marginTop: '32px',
      padding: '16px 0',
      borderTop: '1px solid var(--border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px'
      }}>
        <Database size={14} color="var(--text-tertiary)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--text-secondary)',
            marginRight: '8px'
          }}>
            Data Sources
          </span>
          <span style={{
            fontSize: '11px',
            color: 'var(--text-tertiary)',
            lineHeight: '1.6'
          }}>
            Public Earth Observation datasets including ESA Copernicus (Sentinel-2), USGS Landsat, ISRO Bhuvan, OpenStreetMap, and CARTO.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default DataSourcesFooter;
