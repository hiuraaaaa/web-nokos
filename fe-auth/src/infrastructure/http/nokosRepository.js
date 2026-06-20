import { apiClient } from './apiClient';

export const nokosRepository = {
  // Auth
  login: (body) => apiClient.post('/auth/login', body),
  register: (body) => apiClient.post('/auth/register', body),
  getMe: () => apiClient.get('/auth/me'),

  // Balance (saldo user dari DB, bukan RumahOTP langsung)
  getBalance: () => apiClient.get('/balance'),

  // Topup
  getPaymentChannels: () => apiClient.get('/topup/channels'),
  createTopup: (body) => apiClient.post('/topup', body),
  getTopupHistory: () => apiClient.get('/topup/history'),

  // Catalog
  getServices: () => apiClient.get('/services'),
  getCountries: (serviceId) => apiClient.get(`/countries?service_id=${serviceId}`),
  getOperators: (country, providerId) =>
    apiClient.get(`/operators?country=${encodeURIComponent(country)}&provider_id=${providerId}`),

  // Orders
  createOrder: (payload) => apiClient.post('/orders', payload),
  checkOrder: (orderId) => apiClient.get(`/orders/${orderId}`),
  setOrderStatus: (orderId, status) => apiClient.post(`/orders/${orderId}/status`, { status }),
  listHistory: () => apiClient.get('/orders'),
};
