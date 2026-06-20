class ListOrderHistory {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(userId) {
    if (userId) {
      return this.orderRepository.findByUserId(userId);
    }
    return this.orderRepository.findAll();
  }
}

module.exports = ListOrderHistory;
