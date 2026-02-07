import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const getSources = async () => {
  const response = await api.get('/api/satellite/sources');
  return response.data;
};

export const querySatelliteData = async (params) => {
  const response = await api.post('/api/satellite/query', params);
  return response.data;
};

export const analyzeLandCover = async (params) => {
  const response = await api.post('/api/analysis/landcover', params);
  return response.data;
};

export const analyzeNDVI = async (params) => {
  const response = await api.post('/api/analysis/ndvi', params);
  return response.data;
};

export const compareSources = async (params) => {
  const response = await api.post('/api/analysis/compare', params);
  return response.data;
};

export const mergeComposite = async (params) => {
  const response = await api.post('/api/analysis/merge', params);
  return response.data;
};

export default api;
