const axios = require('axios');
const OtpGateway = require('../../domain/repositories/OtpGateway');
const env = require('../../config/env');

class RumahOtpGateway extends OtpGateway {
  constructor() {
    super();
    this.client = axios.create({
      baseURL: env.rumahOtpBaseUrl,
      timeout: 15000,
      headers: {
        'x-apikey': env.rumahOtpApiKey,
        Accept: 'application/json',
      },
    });
  }

  async _get(path, params) {
    let data;
    try {
      const res = await this.client.get(path, { params });
      data = res.data;
    } catch (err) {
      const apiMessage = err.response?.data?.error?.message;
      const error = new Error(apiMessage || err.message || 'Gagal menghubungi RumahOTP');
      error.status = err.response?.status || 502;
      throw error;
    }

    if (data && data.success === false) {
      const error = new Error(data.error?.message || 'Permintaan ke RumahOTP ditolak');
      error.status = 400;
      throw error;
    }

    return data;
  }

  getBalance() {
    return this._get('/v1/user/balance');
  }

  getServices() {
    return this._get('/v2/services');
  }

  getCountries(serviceId) {
    return this._get('/v2/countries', { service_id: serviceId });
  }

  getOperators(country, providerId) {
    return this._get('/v2/operators', { country, provider_id: providerId });
  }

  createOrder(numberId, providerId, operatorId) {
    return this._get('/v2/orders', {
      number_id: numberId,
      provider_id: providerId,
      operator_id: operatorId,
    });
  }

  checkOrder(orderId) {
    return this._get('/v1/orders/get_status', { order_id: orderId });
  }

  setOrderStatus(orderId, status) {
    return this._get('/v1/orders/set_status', { order_id: orderId, status });
  }
}

module.exports = RumahOtpGateway;
