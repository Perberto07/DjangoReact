import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/transaction/'; // Change to your actual API URL

export const getTransaction = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTransaction = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

export const updateTransaction= async (id, productData) => {
  const response = await axios.put(`${API_URL}${id}/`, productData); // <- Add trailing slash
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`${API_URL}${id}/`); // <- Add trailing slash
  return response.data;
};