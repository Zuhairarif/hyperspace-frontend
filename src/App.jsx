import { useState } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import SourceSelector from './components/SourceSelector';
import DateRangePicker from './components/DateRangePicker';
import { analyzeLandCover, analyzeNDVI, compareSources } from './services/api';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

function App() {
  const [selectedGeometry, setSelectedGeometry] = useState(null);
  const [selectionMode, setSelectionMode] = useState('point');
  const [selectedSources, setSelectedSources] = useState(['sentinel-2']);
  const [startDate, setStartDate] = useState('01-01-2024');
  const [endDate, setEndDate] = useState('31-01-2024');
  const [analysisType, setAnalysisType] = useState('landcover');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedGeometry) {
      setError('Please select a location on the map');
      return;
    }

    if (selectedSources.length === 0) {
      setError('Please select at least one satellite source');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const params = {
        sources: selectedSources,
        geometry: selectedGeometry,
        date_range: {
          start: startDate,
          end: endDate
        },
        cloud_cover_max: 20
      };

      let response;
      if (analysisType === 'landcover') {
        response = await analyzeLandCover(params);
      } else if (analysisType === 'ndvi') {
        response = await analyzeNDVI(params);
      } else if (analysisType === 'compare') {
        response = await compareSources(params);
      }

      setResults(response);
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Header />

      <div className="container" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
          <div>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px var(--shadow)'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                  Select Location
                </h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setSelectionMode('point')}
                    style={{
                      padding: '8px 16px',
                      border: `2px solid ${selectionMode === 'point' ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: '8px',
                      background: selectionMode === 'point' ? 'var(--primary)' : 'white',
                      color: selectionMode === 'point' ? 'white' : 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                  >
                    Point
                  </button>
                  <button
                    onClick={() => setSelectionMode('polygon')}
                    style={{
                      padding: '8px 16px',
                      border: `2px solid ${selectionMode === 'polygon' ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: '8px',
                      background: selectionMode === 'polygon' ? 'var(--primary)' : 'white',
                      color: selectionMode === 'polygon' ? 'white' : 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                  >
                    Area (2 clicks)
                  </button>
                </div>
              </div>
              <Map
                onLocationSelect={setSelectedGeometry}
                selectedGeometry={selectedGeometry}
                selectionMode={selectionMode}
              />
              {selectedGeometry && (
                <div style={{
                  marginTop: '12px',
                  padding: '12px',
                  background: 'var(--background)',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="var(--secondary)" />
                    <span style={{ fontWeight: '500' }}>
                      {selectedGeometry.type} selected
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px var(--shadow)',
              position: 'sticky',
              top: '90px'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                Analysis Parameters
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {selectedGeometry && selectedGeometry.type === 'Point' && analysisType === 'landcover' && (
                  <div style={{
                    padding: '12px',
                    background: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    borderRadius: '8px',
                    display: 'flex',
                    gap: '8px',
                    fontSize: '13px',
                    color: '#1E40AF'
                  }}>
                    <span style={{ flexShrink: 0 }}>ℹ️</span>
                    <span>
                      A 1km radius buffer will be applied around your point to analyze the surrounding area.
                    </span>
                  </div>
                )}

                <SourceSelector
                  selected={selectedSources}
                  onChange={setSelectedSources}
                  multiple={true}
                />

                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                />

                <div>
                  <label className="label">Analysis Type</label>
                  <select
                    className="input"
                    value={analysisType}
                    onChange={(e) => setAnalysisType(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="landcover">Land Cover Classification</option>
                    <option value="ndvi">NDVI Analysis</option>
                    <option value="compare">Compare Sources</option>
                  </select>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={loading || !selectedGeometry || selectedSources.length === 0}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: loading || !selectedGeometry || selectedSources.length === 0
                      ? 'var(--border)'
                      : 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: loading || !selectedGeometry || selectedSources.length === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Run Analysis'
                  )}
                </button>

                {error && (
                  <div style={{
                    padding: '12px',
                    background: '#FEE2E2',
                    border: '1px solid #FCA5A5',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}>
                    <XCircle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13px', color: '#DC2626' }}>{error}</span>
                  </div>
                )}

                {results && (
                  <div style={{
                    padding: '16px',
                    background: 'var(--background)',
                    borderRadius: '12px',
                    border: '1px solid var(--border)'
                  }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px' }}>
                      Results
                    </h3>

                    {analysisType === 'landcover' && results.land_cover_distribution && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {Object.entries(results.land_cover_distribution).map(([key, value]) => {
                          const colors = {
                            water: '#3B82F6',
                            vegetation: '#10B981',
                            urban: '#EF4444',
                            barren: '#F59E0B',
                            forest: '#059669'
                          };
                          return (
                            <div key={key} style={{ marginBottom: '4px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: '13px', textTransform: 'capitalize', fontWeight: '500' }}>
                                  {key}
                                </span>
                                <span style={{ fontSize: '13px', fontWeight: '600', color: colors[key] || '#6B7280' }}>
                                  {(value * 100).toFixed(1)}%
                                </span>
                              </div>
                              <div style={{
                                width: '100%',
                                height: '8px',
                                background: '#E5E7EB',
                                borderRadius: '4px',
                                overflow: 'hidden'
                              }}>
                                <div style={{
                                  width: `${value * 100}%`,
                                  height: '100%',
                                  background: colors[key] || '#6B7280',
                                  borderRadius: '4px',
                                  transition: 'width 0.3s ease'
                                }} />
                              </div>
                            </div>
                          );
                        })}
                        <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
                            <span>Images analyzed:</span>
                            <span style={{ fontWeight: '600' }}>{results.image_count}</span>
                          </div>
                          {results.metadata && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                              <span>Total area:</span>
                              <span style={{ fontWeight: '600' }}>{results.metadata.total_area_km2} km²</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {analysisType === 'ndvi' && results.statistics && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px' }}>Mean NDVI</span>
                          <span style={{ fontSize: '13px', fontWeight: '600' }}>
                            {results.statistics.mean?.toFixed(3)}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px' }}>Min</span>
                          <span style={{ fontSize: '13px', fontWeight: '600' }}>
                            {results.statistics.min?.toFixed(3)}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px' }}>Max</span>
                          <span style={{ fontSize: '13px', fontWeight: '600' }}>
                            {results.statistics.max?.toFixed(3)}
                          </span>
                        </div>
                        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            Images analyzed: {results.image_count}
                          </div>
                        </div>
                      </div>
                    )}

                    {analysisType === 'compare' && results.comparison && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {Object.entries(results.comparison).map(([source, data]) => (
                          <div key={source} style={{
                            padding: '12px',
                            background: 'white',
                            borderRadius: '8px',
                            border: '1px solid var(--border)'
                          }}>
                            <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '6px', textTransform: 'capitalize' }}>
                              {source.replace('-', ' ')}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <div>Images: {data.image_count}</div>
                              <div>Quality: {(data.quality_score * 100).toFixed(0)}%</div>
                              {data.mean_ndvi !== null && (
                                <div>Mean NDVI: {data.mean_ndvi.toFixed(3)}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
