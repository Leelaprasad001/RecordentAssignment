import axios from 'axios';
import { config } from './Constants';

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const allAPIs = {
  signIn,
  signUp,
  refreshToken,
  addManually,
  addCSV,
  downloadPDF,
  paginationAPI,
};

function signIn(payload) {
  return instance.post('/users/signin', payload);
}

function signUp(payload) {
  return instance.post('/users/signup', payload);
}

function refreshToken(payload) {
  return instance.post('/users/refreshToken', payload);
}

function addManually(payload) {
  return instance.post('/employees/addManually', payload);
}

function addCSV(formData) {
  return instance.post('/employees/addCSV', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function downloadPDF() {
  return instance.get('/employees/downloadPDF', {
    responseType: 'blob',
  });
}

function paginationAPI({ page = 1, recordPerPage = 10, sortby = 'employee_id', sortorder = 'asc', filter = '' }) {
  const params = new URLSearchParams({
    page: page.toString(),
    recordPerPage: recordPerPage.toString(),
    sortby,
    sortorder,
  });

  if (filter) {
    params.append('filter', filter);
  }

  return instance.get(`/employees/getAllEmp?${params.toString()}`);
}
