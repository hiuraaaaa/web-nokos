import { apiClient } from './apiClient';

export const nokosRepository = {
  getBalance: () => apiClient.get('/balance'),
  getServices: () => apiClient.get('/services'),
  getCountries: (serviceId) => apiClient.get(`/countries?service_id=${serviceId}`),
  getOperators: (country, providerId) =>
    apiClient.get(`/operators?country=${encodeURIComponent(country)}&provider_id=${providerId}`),
  createOrder: (payload) => apiClient.post('/orders', payload),
  checkOrder: (orderId) => apiClient.get(`/orders/${orderId}`),
  setOrderStatus: (orderId, status) => apiClient.post(`/orders/${orderId}/status`, { status }),
  listHistory: () => apiClient.get('/orders'),
};
