import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const shipmentAPI = {
  // Get all shipments
  getShipments: () => apiClient.get('/shipments'),
  
  // Get single shipment
  getShipment: (id) => apiClient.get(`/shipment/${id}`),
  
  // Create new shipment
  createShipment: (data) => apiClient.post('/shipment', data),
  
  // Update shipment location
  updateShipmentLocation: (id, data) => apiClient.post(`/shipment/${id}/update-location`, data),
  
  // Get shipment ETA
  getShipmentETA: (id) => apiClient.get(`/shipment/${id}/eta`),
};

export default apiClient;
