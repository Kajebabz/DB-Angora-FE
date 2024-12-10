// src/components/apiEnvironmentToggle.tsx
'use client'
import { apiConfig } from '@/config/apiConfig';

export const ApiEnvironmentToggle = () => {
  if (apiConfig.env !== 'development') return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-zinc-800 p-2 rounded-lg">
      <span className="text-sm mr-2">API: {apiConfig.baseUrl}</span>
    </div>
  );
};