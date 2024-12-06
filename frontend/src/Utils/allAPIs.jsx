import axios from 'axios';
import { config } from './Constants';

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
  headers: { 'Content-type': 'application/json' }
});

export const allAPIs = {
  TestAPI,
  signIn,
};

function TestAPI() {
  return instance.get('/');
}

function signIn(payload) {
  return instance.post('/auth/login', payload);
}