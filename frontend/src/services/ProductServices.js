// src/services/productService.js
import axios from 'axios';

const API_URL = 'http://192.168.68.11:8000/product/'; // Change to your actual API URL

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProducts = async (page = 1, pageSize = 20) => {
  const token = localStorage.getItem('access_token');
  
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      page_size: pageSize,
    },
  });
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData, getAuthHeaders());
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}${id}/`, productData, getAuthHeaders()); // <- Add trailing slash
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}${id}/`, getAuthHeaders()); // <- Add trailing slash
  return response.data;
};
  
export const getProductByBarcode = async (barcode) => {
  const response = await axios.get(`${API_URL}by-barcode/?barcode=${barcode}`, getAuthHeaders());
  return response.data;
};

