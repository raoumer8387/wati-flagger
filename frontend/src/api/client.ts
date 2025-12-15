import axios from 'axios';

// Use relative path in production (Vercel), absolute path in development
// In production: baseURL = '/api', so POST to '/classify' becomes '/api/classify'
// In development: baseURL = 'http://localhost:8000', so POST to '/classify' becomes 'http://localhost:8000/classify'
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:8000');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ClassifyResponse {
  category: 'Utility' | 'Marketing' | 'Authentication';
  utility_score: number;
  marketing_score: number;
  auth_score: number;
  explanation: string;
}

export interface RewriteResponse {
  rewritten: string;
}

export const classifyMessage = async (message: string): Promise<ClassifyResponse> => {
  const response = await apiClient.post<ClassifyResponse>('/classify', {
    message,
  });
  return response.data;
};

export const rewriteAsUtility = async (message: string): Promise<RewriteResponse> => {
  const response = await apiClient.post<RewriteResponse>('/rewrite-utility', {
    message,
  });
  return response.data;
};

