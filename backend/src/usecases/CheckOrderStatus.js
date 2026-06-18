class CheckOrderStatus {
  constructor(otpGateway, orderRepository) {
    this.otpGateway = otpGateway;
    this.orderRepository = orderRepository;
  }

  async execute(orderId) {
    const res = await this.otpGateway.checkOrder(orderId);
    const d = res.data;

    const updated = await this.orderRepository.update(orderId, {
      status: d.status,
      otpCode: d.otp_code || null,
      otpMessage: d.otp_msg || null,
    });

    // Order dibuat sebelum proses ini berjalan (race antara create & polling pertama),
    // fallback ke data mentah dari provider biar response tetap konsisten.
    return updated || {
      orderId: d.order_id,
      phoneNumber: d.phone_number,
      service: d.service,
      country: d.country,
      status: d.status,
      otpCode: d.otp_code || null,
      otpMessage: d.otp_msg || null,
      createdAt: d.created_at,
      expiredAt: d.expired_at,
    };
  }
}

module.exports = CheckOrderStatus;
