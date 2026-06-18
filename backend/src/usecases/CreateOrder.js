const { createOrder } = require('../domain/entities/Order');

class CreateOrder {
  constructor(otpGateway, orderRepository) {
    this.otpGateway = otpGateway;
    this.orderRepository = orderRepository;
  }

  async execute({ numberId, providerId, operatorId }) {
    const res = await this.otpGateway.createOrder(numberId, providerId, operatorId);
    const d = res.data;

    const order = createOrder({
      orderId: d.order_id,
      phoneNumber: d.phone_number,
      service: d.service,
      country: d.country,
      operator: d.operator,
      price: d.price,
      priceFormatted: d.price_formated,
      status: 'pending',
      createdAt: d.created_at,
      expiredAt: d.expired_at,
    });

    await this.orderRepository.save(order);
    return order;
  }
}

module.exports = CreateOrder;
