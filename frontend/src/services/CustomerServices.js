import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/customer/'; // Change to your actual API URL

export const getCustomer= async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCustomer = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

export const updateCustomer = async (id, productData) => {
  const response = await axios.put(`${API_URL}${id}/`, productData); // <- Add trailing slash
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axios.delete(`${API_URL}${id}/`); // <- Add trailing slash
  return response.data;
};

