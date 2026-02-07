import { Info } from 'lucide-react';

const FusionExplanation = ({ analysisType, visible }) => {
  if (!visible) return null;

  return (
    <div className="fade-in" style={{
      padding: '10px 12px',
      background: 'linear-gradient(135deg, rgba(37,99,235,0.04), rgba(5,150,105,0.04))',
      border: '1px solid rgba(37,99,235,0.12)',
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      gap: '8px',
      alignItems: 'flex-start'
    }}>
      <Info size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '1px' }} />
      <p style={{
        fontSize: '12px',
        color: 'var(--text-secondary)',
        margin: 0,
        lineHeight: '1.5'
      }}>
        {analysisType === 'compare'
          ? 'Selected satellite datasets are spatially and temporally aligned to enable unified comparison and multi-agency insights.'
          : 'Multiple satellite sources are fused by aligning their spatial and temporal references, enabling cross-validated analysis and richer insights.'}
      </p>
    </div>
  );
};

export default FusionExplanation;
