// Environment-specific configurations
const prod = {
    url: {
      API_BASE_URL: 'https://cropqapis.vercel.app'
    }
  };
  
  const dev = {
    url: {
      API_BASE_URL: 'http://localhost:3000'
    }
  };
export const config = process.env.NODE_ENV === 'development' ? dev : prod;