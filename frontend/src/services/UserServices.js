import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/users/user/'; // Change to your actual API URL

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUsers = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const createUser = async (productData) => {
  const response = await axios.post(API_URL, getAuthHeaders());
  return response.data;
};

export const updateUser= async (id, productData) => {
  const response = await axios.put(`${API_URL}${id}/`, getAuthHeaders()); // <- Add trailing slash
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}${id}/`, getAuthHeaders()); // <- Add trailing slash
  return response.data;
};