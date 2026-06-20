class CheckOrderStatus {
  constructor(otpGateway, orderRepository) {
    this.otpGateway = otpGateway;
    this.orderRepository = orderRepository;
  }

  async execute(orderId, userId) {
    const stored = await this.orderRepository.findById(orderId);
    if (!stored) {
      const err = new Error('Order tidak ditemukan');
      err.status = 404;
      throw err;
    }

    // Pastikan order milik user yang request
    if (userId && stored.user_id && stored.user_id !== userId) {
      const err = new Error('Akses ditolak');
      err.status = 403;
      throw err;
    }

    const res = await this.otpGateway.checkOrder(orderId);
    const d = res.data;

    const updated = await this.orderRepository.update(orderId, {
      status: d.status,
      otp: d.otp || null,
    });

    return updated || stored;
  }
}

module.exports = CheckOrderStatus;
