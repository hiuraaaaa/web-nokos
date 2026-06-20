class SetOrderStatus {
  constructor(otpGateway, orderRepository) {
    this.otpGateway = otpGateway;
    this.orderRepository = orderRepository;
  }

  async execute(orderId, status, userId) {
    const stored = await this.orderRepository.findById(orderId);
    if (!stored) {
      const err = new Error('Order tidak ditemukan');
      err.status = 404;
      throw err;
    }

    if (userId && stored.user_id && stored.user_id !== userId) {
      const err = new Error('Akses ditolak');
      err.status = 403;
      throw err;
    }

    await this.otpGateway.setOrderStatus(orderId, status);
    const updated = await this.orderRepository.update(orderId, { status });
    return updated || stored;
  }
}

module.exports = SetOrderStatus;
