const { createOrder } = require('../domain/entities/Order');

class CreateOrder {
  constructor(otpGateway, orderRepository, userRepository) {
    this.otpGateway = otpGateway;
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
  }

  async execute({ userId, numberId, providerId, operatorId }) {
    // 1. Ambil harga dulu dari catalog sebelum order
    // RumahOTP tidak ada endpoint get price per item, jadi kita ambil dari operator list
    // Untuk sekarang, kita order dulu lalu potong saldo berdasarkan harga response

    // 2. Cek user ada
    const user = await this.userRepository.findById(userId);
    if (!user) {
      const err = new Error('User tidak ditemukan');
      err.status = 404;
      throw err;
    }

    // 3. Hit RumahOTP untuk beli nomor
    let res;
    try {
      res = await this.otpGateway.createOrder(numberId, providerId, operatorId);
    } catch (err) {
      throw err;
    }

    const d = res.data;
    const price = d.price || 0;

    // 4. Cek saldo cukup
    if (user.balance < price) {
      // Order sudah terlanjur dibuat di RumahOTP — cancel dulu
      try {
        await this.otpGateway.setOrderStatus(d.order_id, 'cancel');
      } catch (_) {}
      const err = new Error(`Saldo tidak cukup. Saldo kamu: Rp${user.balance.toLocaleString('id-ID')}, harga nomor: Rp${price.toLocaleString('id-ID')}`);
      err.status = 402;
      throw err;
    }

    // 5. Potong saldo user
    const newBalance = user.balance - price;
    await this.userRepository.updateBalance(userId, newBalance);

    // 6. Simpan order ke DB dengan userId
    const order = createOrder({
      orderId: d.order_id,
      userId,
      phoneNumber: d.phone_number,
      service: d.service,
      country: d.country,
      operator: d.operator,
      price,
      priceFormatted: d.price_formated,
      status: 'pending',
      createdAt: d.created_at,
      expiredAt: d.expired_at,
    });

    await this.orderRepository.save(order);
    return { ...order, remainingBalance: newBalance };
  }
}

module.exports = CreateOrder;
