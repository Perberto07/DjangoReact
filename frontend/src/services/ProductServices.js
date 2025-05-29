// src/services/productService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/product/'; // Change to your actual API URL

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}${id}/`, productData); // <- Add trailing slash
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}${id}/`); // <- Add trailing slash
  return response.data;
};
  
export const getProductByBarcode = async (barcode) => {
  const response = await axios.get(`${API_URL}by-barcode/?barcode=${barcode}`);
  return response.data;
};

