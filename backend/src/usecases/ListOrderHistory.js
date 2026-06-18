class ListOrderHistory {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute() {
    const orders = await this.orderRepository.findAll();
    return orders.slice().sort((a, b) => b.createdAt - a.createdAt);
  }
}

module.exports = ListOrderHistory;
