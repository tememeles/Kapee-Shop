// API configuration utility
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend-repo-2-v8wc.onrender.com';

export { API_BASE_URL };

// Helper function to construct API URLs
export const getApiUrl = (endpoint: string) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};