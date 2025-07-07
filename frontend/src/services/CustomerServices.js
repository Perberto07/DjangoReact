import axios from 'axios';

const API_URL = 'http://192.168.68.11:8000/customer/'; // Change to your actual API URL

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCustomer = async (page = 1, pageSize = 20) => {
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

  return {
    results: Array.isArray(response.data?.results) ? response.data.results : [],
    count: response.data?.count || 0,
  };
};


export const createCustomer = async (productData) => {
  const response = await axios.post(API_URL, productData, getAuthHeaders());
  return response.data;
};

export const updateCustomer = async (id, productData) => {
  const response = await axios.put(`${API_URL}${id}/`, productData, getAuthHeaders()); // <- Add trailing slash
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axios.delete(`${API_URL}${id}/`, getAuthHeaders()); // <- Add trailing slash
  return response.data;
};

