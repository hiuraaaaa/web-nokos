/**
 * Kontrak gateway ke provider OTP (RumahOTP).
 * Implementasi konkretnya ada di infrastructure/http/RumahOtpGateway.js.
 * Kalau suatu saat provider diganti, cukup buat implementasi baru dari kontrak ini
 * tanpa ubah satu pun usecase.
 */
class OtpGateway {
  async getBalance() {
    throw new Error('OtpGateway.getBalance belum diimplementasikan');
  }

  async getServices() {
    throw new Error('OtpGateway.getServices belum diimplementasikan');
  }

  async getCountries(_serviceId) {
    throw new Error('OtpGateway.getCountries belum diimplementasikan');
  }

  async getOperators(_country, _providerId) {
    throw new Error('OtpGateway.getOperators belum diimplementasikan');
  }

  async createOrder(_numberId, _providerId, _operatorId) {
    throw new Error('OtpGateway.createOrder belum diimplementasikan');
  }

  async checkOrder(_orderId) {
    throw new Error('OtpGateway.checkOrder belum diimplementasikan');
  }

  async setOrderStatus(_orderId, _status) {
    throw new Error('OtpGateway.setOrderStatus belum diimplementasikan');
  }
}

module.exports = OtpGateway;
