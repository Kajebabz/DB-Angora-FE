// src/config/apiConfig.ts
import { API_URLS } from './constants';

interface ApiConfig {
  baseUrl: string;
  env: string;
}

export const apiConfig: ApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || API_URLS.PRODUCTION,
  env: process.env.NEXT_PUBLIC_API_ENV || 'production'
};

export const getApiUrl = (endpoint: string): string => {
  return `${apiConfig.baseUrl}/${endpoint.replace(/^\//, '')}`;
};