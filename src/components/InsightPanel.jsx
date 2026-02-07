import { Sparkles, TrendingUp, Mountain, Droplets, TreePine } from 'lucide-react';

const SOURCE_INSIGHTS = {
  'sentinel-2': {
    ndvi: 'High-resolution NDVI mapping at 10m scale. Strong vegetation signal detected with clear spectral differentiation.',
    landcover: 'Detailed land surface classification leveraging 13 spectral bands. Urban and vegetation boundaries well-defined.',
    compare: 'Provides highest spatial resolution (10m) in the fusion. Acts as the primary reference layer for alignment.',
    icon: '//S2',
    color: 'var(--sentinel-color)'
  },
  'landsat-8': {
    ndvi: 'Moderate-resolution NDVI with 30+ years of historical context. Enables long-term vegetation trend detection.',
    landcover: 'Robust classification using thermal and multispectral bands. Historical baseline for change detection.',
    compare: 'Offers temporal depth (30m) for historical comparison. Calibrated for cross-sensor radiometric consistency.',
    icon: '//L8',
    color: 'var(--landsat-color)'
  },
  'isro-resourcesat': {
    ndvi: 'Medium-resolution NDVI at 23.5m. Optimized for regional-scale vegetation and agricultural monitoring.',
    landcover: 'Terrain-aware surface classification. Strong performance in hilly and heterogeneous landscapes.',
    compare: 'Adds terrain-sensitive perspective (23.5m) from ISRO. Complements western agency datasets with regional calibration.',
    icon: '//RS',
    color: 'var(--isro-color)'
  }
};

const COMBINED_INSIGHTS = {
  ndvi: 'Multi-source NDVI comparison reveals vegetation health trends across different spatial resolutions, providing a more complete picture than any single sensor.',
  landcover: 'Cross-validated land cover mapping reduces classification uncertainty by leveraging complementary spectral characteristics from multiple sensors.',
  compare: 'Spatially and temporally aligned datasets enable unified multi-agency insights, reducing single-source bias and improving analytical confidence.'
};

const InsightPanel = ({ selectedSources, analysisType, results, loading }) => {
  if (loading) {
    return (
      <div style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        boxShadow: '0 1px 3px var(--shadow), 0 0 0 1px var(--border-light)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div className="skeleton" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
          <div className="skeleton skeleton-text" style={{ width: '180px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="skeleton" style={{ height: '48px' }} />
          <div className="skeleton" style={{ height: '48px' }} />
          <div className="skeleton" style={{ height: '36px' }} />
        </div>
      </div>
    );
  }

  if (!selectedSources || selectedSources.length === 0) return null;

  return (
    <div className="fade-in" style={{
      background: 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      boxShadow: '0 1px 3px var(--shadow), 0 0 0 1px var(--border-light)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: 'var(--radius-sm)',
          background: 'linear-gradient(135deg, var(--primary-light), var(--secondary-light))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Sparkles size={14} color="var(--primary)" />
        </div>
        <div>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            margin: 0
          }}>
            Unified Analysis Summary
          </h3>
          <p style={{
            fontSize: '11px',
            color: 'var(--text-tertiary)',
            margin: 0
          }}>
            {selectedSources.length > 1 ? 'Multi-satellite fusion insights' : 'Single-source analysis'}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {selectedSources.map((sourceId) => {
          const sourceData = SOURCE_INSIGHTS[sourceId];
          if (!sourceData) return null;

          return (
            <div key={sourceId} style={{
              padding: '10px 12px',
              background: 'var(--background)',
              borderRadius: 'var(--radius-md)',
              borderLeft: `3px solid ${sourceData.color}`,
              fontSize: '12px',
              lineHeight: '1.5',
              color: 'var(--text-secondary)'
            }}>
              <div style={{
                fontWeight: '600',
                fontSize: '11px',
                color: 'var(--text-primary)',
                marginBottom: '3px',
                textTransform: 'uppercase',
                letterSpacing: '0.03em'
              }}>
                {sourceId.replace('-', ' ').replace('isro resourcesat', 'ISRO ResourceSat')}
              </div>
              {sourceData[analysisType]}
            </div>
          );
        })}

        {selectedSources.length > 1 && (
          <div style={{
            padding: '12px',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.05), rgba(5,150,105,0.05))',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(37,99,235,0.1)',
            fontSize: '12px',
            lineHeight: '1.5',
            color: 'var(--text-primary)',
            fontWeight: '500'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '4px'
            }}>
              <TrendingUp size={12} color="var(--primary)" />
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                color: 'var(--primary)'
              }}>
                Combined Insight
              </span>
            </div>
            {COMBINED_INSIGHTS[analysisType]}
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightPanel;
