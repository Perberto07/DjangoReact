import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/transaction/'; // Change to your actual API URL


const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTransaction = async (page = 1, pageSize = 10) => {
  const token = localStorage.getItem('access_token');
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { page, page_size: pageSize },
  });

  return {
    results: response.data.results || [],
    count: response.data.count || 0,
  };
};

// TransactionServices.js
export const getTransactionById = async (id) => {
  const response = await axios.get(`${API_URL}${id}/`, getAuthHeaders());
  return response.data;
};


export const createTransaction = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

export const updateTransaction= async (id, productData) => {
  const response = await axios.put(`${API_URL}${id}/`, productData, getAuthHeaders()); // <- Add trailing slash
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`${API_URL}${id}/`); // <- Add trailing slash
  return response.data;
};