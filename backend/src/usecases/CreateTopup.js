const { v4: uuidv4 } = require('uuid');

class CreateTopup {
  constructor(topupRepository, tripayGateway, userRepository) {
    this.topupRepository = topupRepository;
    this.tripayGateway = tripayGateway;
    this.userRepository = userRepository;
  }

  async execute({ userId, amount, paymentMethod }) {
    if (amount < 10000) {
      const err = new Error('Minimal topup Rp10.000');
      err.status = 400;
      throw err;
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      const err = new Error('User tidak ditemukan');
      err.status = 404;
      throw err;
    }

    const topupId = uuidv4();
    const merchantRef = `TOPUP-${topupId}`;

    // Hit Tripay untuk buat transaksi
    const tripayRes = await this.tripayGateway.createTransaction({
      merchantRef,
      amount,
      customerName: user.username,
      customerEmail: user.email,
      paymentMethod,
    });

    const tripayData = tripayRes.data;

    const topup = {
      id: topupId,
      userId,
      amount,
      fee: tripayData.total_fee || 0,
      status: 'pending',
      paymentMethod,
      tripayRef: tripayData.reference,
      tripayChannel: tripayData.payment_method,
      payUrl: tripayData.checkout_url || tripayData.pay_url || null,
      createdAt: new Date().toISOString(),
    };

    await this.topupRepository.save(topup);
    return topup;
  }
}

module.exports = CreateTopup;
