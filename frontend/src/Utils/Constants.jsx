const prod = {
    url: {
      API_BASE_URL: 'https://recordent-backend.vercel.app/'
    }
  };
  
  const dev = {
    url: {
      API_BASE_URL: 'http://localhost:5000'
    }
  };
export const config = process.env.NODE_ENV === 'development' ? dev : prod;