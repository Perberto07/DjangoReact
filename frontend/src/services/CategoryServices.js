import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/category/';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCategory = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await axios.post(API_URL, categoryData, getAuthHeaders());
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await axios.put(`${API_URL}${id}/`, categoryData, getAuthHeaders());
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}${id}/`, getAuthHeaders());
  return response.data;
};