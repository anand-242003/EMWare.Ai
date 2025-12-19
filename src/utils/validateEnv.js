export const validateEnvironment = () => {
  const requiredEnvVars = {
    VITE_GOOGLE_MAPS_API_KEY: 'Google Maps API Key',
    VITE_GEMINI_API_KEY: 'Gemini API Key',
    VITE_AUTH0_DOMAIN: 'Auth0 Domain',
    VITE_AUTH0_CLIENT_ID: 'Auth0 Client ID',
    VITE_PEXELS_API_KEY: 'Pexels API Key'
  };

  const missing = [];

  Object.entries(requiredEnvVars).forEach(([key, name]) => {
    if (!import.meta.env[key]) {
      missing.push(name);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.join(', '));
    return false;
  }

  return true;
};
