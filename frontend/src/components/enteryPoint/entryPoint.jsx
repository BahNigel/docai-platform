// src/api/entryPoint.js
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api'; // Replace with your backend URL

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const apiRequest = async (
  endpoint,
  method = 'get',
  data = null,
  customHeaders = {},
) => {
  try {
    const isFormData = data instanceof FormData;

    const headers = {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...customHeaders,
    };

    const response = await apiClient.request({
      url: endpoint,
      method,
      data: isFormData ? data : JSON.stringify(data),
      headers,
    });

    return { success: true, data: response.data, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.response?.data || error.message,
    };
  }
};
