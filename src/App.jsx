import { useState } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import SourceSelector from './components/SourceSelector';
import DateRangePicker from './components/DateRangePicker';
import AnalysisTypeSelector from './components/AnalysisTypeSelector';
import InsightPanel from './components/InsightPanel';
import FusionExplanation from './components/FusionExplanation';
import { analyzeLandCover, analyzeNDVI, compareSources } from './services/api';
import {
  Loader2,
  CheckCircle2,
  XCircle,
  MapPin,
  Crosshair,
  Square,
  Satellite,
  ArrowRight,
  BarChart3,
  Layers
} from 'lucide-react';

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

  const isReady = selectedGeometry && selectedSources.length > 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Header selectedSourcesCount={selectedSources.length} />

      <div className="container" style={{ paddingTop: '24px', paddingBottom: '32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '20px',
          alignItems: 'start'
        }}>
          {/* Left: Map Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              boxShadow: '0 1px 3px var(--shadow), 0 0 0 1px var(--border-light)'
            }}>
              {/* Location selector header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} color="var(--primary)" />
                  <h2 style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    margin: 0,
                    color: 'var(--text-primary)'
                  }}>
                    Select Location
                  </h2>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => setSelectionMode('point')}
                    style={{
                      padding: '6px 14px',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      background: selectionMode === 'point' ? 'var(--primary)' : 'var(--background)',
                      color: selectionMode === 'point' ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontFamily: 'inherit'
                    }}
                  >
                    <Crosshair size={12} />
                    Point
                  </button>
                  <button
                    onClick={() => setSelectionMode('polygon')}
                    style={{
                      padding: '6px 14px',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      background: selectionMode === 'polygon' ? 'var(--primary)' : 'var(--background)',
                      color: selectionMode === 'polygon' ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontFamily: 'inherit'
                    }}
                  >
                    <Square size={12} />
                    Area
                  </button>
                </div>
              </div>

              <Map
                onLocationSelect={setSelectedGeometry}
                selectedGeometry={selectedGeometry}
                selectionMode={selectionMode}
                analysisType={analysisType}
                selectedSources={selectedSources}
              />

              {/* Status bar */}
              <div style={{
                marginTop: '12px',
                padding: '10px 14px',
                background: selectedGeometry ? 'var(--secondary-light)' : 'var(--background)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}>
                {selectedGeometry ? (
                  <>
                    <CheckCircle2 size={14} color="var(--secondary)" />
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--secondary)'
                    }}>
                      {selectedGeometry.type === 'Point' ? 'Point' : 'Area'} selected
                    </span>
                    <span style={{
                      fontSize: '11px',
                      color: 'var(--text-secondary)',
                      marginLeft: 'auto'
                    }}>
                      {selectedGeometry.type === 'Point'
                        ? `${selectedGeometry.coordinates[1].toFixed(4)}, ${selectedGeometry.coordinates[0].toFixed(4)}`
                        : 'Bounding box defined'}
                    </span>
                  </>
                ) : (
                  <>
                    <Crosshair size={14} color="var(--text-tertiary)" />
                    <span style={{
                      fontSize: '12px',
                      color: 'var(--text-tertiary)'
                    }}>
                      Click on the map to select a {selectionMode === 'point' ? 'point' : 'bounding area'}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Insight panel below map */}
            <InsightPanel
              selectedSources={selectedSources}
              analysisType={analysisType}
              results={results}
              loading={loading}
            />
          </div>

          {/* Right: Controls Panel */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'sticky',
            top: '80px'
          }}>
            {/* Analysis Parameters Card */}
            <div style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              boxShadow: '0 1px 3px var(--shadow), 0 0 0 1px var(--border-light)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '18px'
              }}>
                <Satellite size={16} color="var(--primary)" />
                <h2 style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  margin: 0,
                  color: 'var(--text-primary)'
                }}>
                  Analysis Parameters
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Info notice */}
                {selectedGeometry && selectedGeometry.type === 'Point' && analysisType === 'landcover' && (
                  <div className="fade-in" style={{
                    padding: '10px 12px',
                    background: 'var(--primary-light)',
                    border: '1px solid rgba(37,99,235,0.15)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    gap: '8px',
                    fontSize: '12px',
                    color: 'var(--primary-dark)',
                    lineHeight: '1.5'
                  }}>
                    <span style={{ flexShrink: 0, marginTop: '1px' }}>
                      <MapPin size={13} />
                    </span>
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

                {/* Fusion explanation */}
                <FusionExplanation
                  analysisType={analysisType}
                  visible={selectedSources.length > 1}
                />

                <div className="section-divider" />

                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                />

                <div className="section-divider" />

                <AnalysisTypeSelector
                  value={analysisType}
                  onChange={setAnalysisType}
                />

                {/* Run button */}
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !isReady}
                  style={{
                    width: '100%',
                    padding: '13px',
                    background: loading || !isReady
                      ? 'var(--border)'
                      : 'var(--primary)',
                    color: loading || !isReady ? 'var(--text-tertiary)' : 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: loading || !isReady ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                    boxShadow: loading || !isReady ? 'none' : '0 2px 8px rgba(37, 99, 235, 0.3)'
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Run Analysis
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>

                {/* Error message */}
                {error && (
                  <div className="fade-in" style={{
                    padding: '10px 12px',
                    background: '#FEF2F2',
                    border: '1px solid #FECACA',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}>
                    <XCircle size={15} color="#DC2626" style={{ flexShrink: 0, marginTop: '1px' }} />
                    <span style={{ fontSize: '12px', color: '#DC2626', lineHeight: '1.4' }}>{error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Results Card */}
            {loading && !results && (
              <div style={{
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
                  <div className="skeleton" style={{ width: '16px', height: '16px', borderRadius: '4px' }} />
                  <div className="skeleton skeleton-text" style={{ width: '120px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="skeleton" style={{ height: '32px' }} />
                  <div className="skeleton" style={{ height: '32px' }} />
                  <div className="skeleton" style={{ height: '32px' }} />
                  <div className="skeleton" style={{ height: '32px' }} />
                </div>
              </div>
            )}

            {results && (
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
                  <BarChart3 size={16} color="var(--primary)" />
                  <h3 style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    margin: 0,
                    color: 'var(--text-primary)'
                  }}>
                    Results
                  </h3>
                </div>

                {/* Land Cover Results */}
                {analysisType === 'landcover' && results.land_cover_distribution && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {Object.entries(results.land_cover_distribution).map(([key, value]) => {
                      const colors = {
                        water: '#2563EB',
                        vegetation: '#059669',
                        urban: '#DC2626',
                        barren: '#D97706',
                        forest: '#047857'
                      };
                      return (
                        <div key={key}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px'
                          }}>
                            <span style={{
                              fontSize: '12px',
                              textTransform: 'capitalize',
                              fontWeight: '500',
                              color: 'var(--text-primary)'
                            }}>
                              {key}
                            </span>
                            <span style={{
                              fontSize: '12px',
                              fontWeight: '700',
                              color: colors[key] || 'var(--text-secondary)'
                            }}>
                              {(value * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div style={{
                            width: '100%',
                            height: '6px',
                            background: 'var(--background)',
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${value * 100}%`,
                              height: '100%',
                              background: colors[key] || 'var(--text-secondary)',
                              borderRadius: '3px',
                              transition: 'width 0.5s ease'
                            }} />
                          </div>
                        </div>
                      );
                    })}
                    <div className="section-divider" />
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '11px',
                        color: 'var(--text-secondary)'
                      }}>
                        <span>Images analyzed</span>
                        <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                          {results.image_count}
                        </span>
                      </div>
                      {results.metadata && (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '11px',
                          color: 'var(--text-secondary)'
                        }}>
                          <span>Total area</span>
                          <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                            {results.metadata.total_area_km2} km2
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* NDVI Results */}
                {analysisType === 'ndvi' && results.statistics && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { label: 'Mean NDVI', value: results.statistics.mean },
                      { label: 'Min NDVI', value: results.statistics.min },
                      { label: 'Max NDVI', value: results.statistics.max }
                    ].map(({ label, value: val }) => (
                      <div key={label} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 12px',
                        background: 'var(--background)',
                        borderRadius: 'var(--radius-sm)'
                      }}>
                        <span style={{
                          fontSize: '12px',
                          color: 'var(--text-secondary)'
                        }}>
                          {label}
                        </span>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '700',
                          color: 'var(--text-primary)',
                          fontFamily: 'monospace'
                        }}>
                          {val?.toFixed(3)}
                        </span>
                      </div>
                    ))}
                    <div className="section-divider" />
                    <div style={{
                      fontSize: '11px',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span>Images analyzed</span>
                      <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                        {results.image_count}
                      </span>
                    </div>
                  </div>
                )}

                {/* Compare Results */}
                {analysisType === 'compare' && results.comparison && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Object.entries(results.comparison).map(([source, data]) => {
                      const sourceColors = {
                        'sentinel-2': '#2563EB',
                        'landsat-8': '#059669',
                        'isro-resourcesat': '#D97706'
                      };
                      const sourceColor = sourceColors[source] || 'var(--text-secondary)';
                      return (
                        <div key={source} style={{
                          padding: '12px',
                          background: 'var(--background)',
                          borderRadius: 'var(--radius-md)',
                          borderLeft: `3px solid ${sourceColor}`
                        }}>
                          <div style={{
                            fontSize: '13px',
                            fontWeight: '700',
                            marginBottom: '6px',
                            textTransform: 'capitalize',
                            color: 'var(--text-primary)'
                          }}>
                            {source.replace('-', ' ')}
                          </div>
                          <div style={{
                            fontSize: '11px',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '3px'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>Images</span>
                              <span style={{ fontWeight: '600' }}>{data.image_count}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>Quality</span>
                              <span style={{ fontWeight: '600' }}>
                                {(data.quality_score * 100).toFixed(0)}%
                              </span>
                            </div>
                            {data.mean_ndvi !== null && (
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Mean NDVI</span>
                                <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>
                                  {data.mean_ndvi.toFixed(3)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Empty state when no results and not loading */}
            {!results && !loading && !error && (
              <div style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 1px 3px var(--shadow), 0 0 0 1px var(--border-light)'
              }}>
                <div className="empty-state" style={{ padding: '32px 20px' }}>
                  <div className="empty-state-icon">
                    <Layers size={22} />
                  </div>
                  <div className="empty-state-title">
                    No results yet
                  </div>
                  <div className="empty-state-desc">
                    Select satellites, choose a location on the map, and run analysis to see results here.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
