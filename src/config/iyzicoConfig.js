// Iyzico Configuration
// Replace these with your actual Iyzico credentials

export const IYZICO_CONFIG = {
  // Sandbox credentials for testing
  sandbox: {
    apiKey: 'sandbox-your_api_key_here',
    secretKey: 'sandbox-your_secret_key_here',
    uri: 'https://sandbox-api.iyzipay.com'
  },
  
  // Production credentials
  production: {
    apiKey: 'production-your_api_key_here',
    secretKey: 'production-your_secret_key_here',
    uri: 'https://api.iyzipay.com'
  }
};

// Get current environment configuration
export const getIyzicoConfig = () => {
  const isProduction = import.meta.env.PROD;
  return isProduction ? IYZICO_CONFIG.production : IYZICO_CONFIG.sandbox;
};

// Environment variables (if available)
export const IYZICO_ENV = {
  apiKey: import.meta.env.VITE_IYZICO_API_KEY || getIyzicoConfig().apiKey,
  secretKey: import.meta.env.VITE_IYZICO_SECRET_KEY || getIyzicoConfig().secretKey,
  uri: import.meta.env.VITE_IYZICO_URI || getIyzicoConfig().uri
};
