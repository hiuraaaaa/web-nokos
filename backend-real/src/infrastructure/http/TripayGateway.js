const axios = require('axios');
const crypto = require('crypto');
const env = require('../../config/env');

/**
 * TripayGateway — wrapper untuk Tripay Payment API (sandbox & production).
 * Docs: https://tripay.co.id/developer
 */
class TripayGateway {
  constructor() {
    this.client = axios.create({
      baseURL: env.tripayBaseUrl,
      timeout: 15000,
      headers: {
        Authorization: `Bearer ${env.tripayApiKey}`,
        Accept: 'application/json',
      },
    });
  }

  /**
   * Buat transaksi closed payment (nominal pasti, user bayar tepat jumlahnya).
   */
  async createTransaction({ merchantRef, amount, customerName, customerEmail, paymentMethod, returnUrl }) {
    const signature = this._signature(merchantRef, amount);

    const payload = {
      method: paymentMethod,
      merchant_ref: merchantRef,
      amount,
      customer_name: customerName,
      customer_email: customerEmail,
      order_items: [
        {
          name: 'Top Up Saldo',
          price: amount,
          quantity: 1,
        },
      ],
      return_url: returnUrl || env.tripayReturnUrl,
      expired_time: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 jam
      signature,
    };

    try {
      const res = await this.client.post('/transaction/create', payload);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      const error = new Error(msg);
      error.status = err.response?.status || 502;
      throw error;
    }
  }

  /**
   * Cek status transaksi berdasarkan merchant_ref.
   */
  async getTransactionStatus(merchantRef) {
    try {
      const res = await this.client.get('/transaction/detail', {
        params: { reference: merchantRef },
      });
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      const error = new Error(msg);
      error.status = err.response?.status || 502;
      throw error;
    }
  }

  /**
   * Ambil daftar payment channel yang tersedia.
   */
  async getPaymentChannels() {
    try {
      const res = await this.client.get('/merchant/payment-channel');
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      const error = new Error(msg);
      error.status = err.response?.status || 502;
      throw error;
    }
  }

  /**
   * Verifikasi signature dari webhook Tripay.
   * Panggil ini di webhook handler sebelum proses apapun.
   */
  verifyWebhookSignature(payload, receivedSignature) {
    const jsonString = JSON.stringify(payload);
    const expected = crypto
      .createHmac('sha256', env.tripayPrivateKey)
      .update(jsonString)
      .digest('hex');
    return expected === receivedSignature;
  }

  /**
   * Generate signature untuk create transaction.
   * Format: HMAC-SHA256(privateKey, merchantCode + merchantRef + amount)
   */
  _signature(merchantRef, amount) {
    return crypto
      .createHmac('sha256', env.tripayPrivateKey)
      .update(env.tripayMerchantCode + merchantRef + amount)
      .digest('hex');
  }
}

module.exports = TripayGateway;
