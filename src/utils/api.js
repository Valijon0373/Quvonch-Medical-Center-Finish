// API base URL helper
// In development, use proxy (/api)
// In production, use full API URL
const getApiBaseUrl = () => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    // Development: use proxy
    return '/api'
  }
  
  // Production: use full API URL
  return import.meta.env.VITE_API_URL || 'https://api.greentraver.uz'
}

export const API_BASE_URL = getApiBaseUrl()

// Helper function to build API URLs
export const apiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  return `${API_BASE_URL}/${cleanEndpoint}`
}
