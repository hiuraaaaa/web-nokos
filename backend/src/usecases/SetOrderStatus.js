const STATUS_MAP = {
  cancel: 'canceled',
  done: 'completed',
  resend: 'pending',
};

class SetOrderStatus {
  constructor(otpGateway, orderRepository) {
    this.otpGateway = otpGateway;
    this.orderRepository = orderRepository;
  }

  async execute(orderId, status) {
    await this.otpGateway.setOrderStatus(orderId, status);
    const updated = await this.orderRepository.update(orderId, {
      status: STATUS_MAP[status] || status,
    });
    return updated;
  }
}

module.exports = SetOrderStatus;
