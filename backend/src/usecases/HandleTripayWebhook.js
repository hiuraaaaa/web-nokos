/**
 * HandleTripayWebhook — dijalankan ketika Tripay kirim notifikasi pembayaran.
 * Kalau status PAID → update topup → tambah saldo user.
 */
class HandleTripayWebhook {
  constructor(topupRepository, userRepository, tripayGateway) {
    this.topupRepository = topupRepository;
    this.userRepository = userRepository;
    this.tripayGateway = tripayGateway;
  }

  async execute({ payload, signature }) {
    // Verifikasi signature dari Tripay
    const valid = this.tripayGateway.verifyWebhookSignature(payload, signature);
    if (!valid) {
      const err = new Error('Signature tidak valid');
      err.status = 400;
      throw err;
    }

    const { merchant_ref: merchantRef, status, paid_at: paidAt } = payload;

    // Cari topup berdasarkan reference Tripay
    // merchantRef format: TOPUP-{uuid}
    const topupId = merchantRef.replace('TOPUP-', '');
    const topup = await this.topupRepository.findById(topupId);

    if (!topup) {
      const err = new Error('Topup tidak ditemukan');
      err.status = 404;
      throw err;
    }

    // Idempotent — kalau sudah paid, skip
    if (topup.status === 'paid') return { message: 'Already processed' };

    if (status === 'PAID') {
      // Update status topup
      await this.topupRepository.updateStatus(topup.id, 'paid', paidAt);

      // Tambah saldo user
      const user = await this.userRepository.findById(topup.user_id);
      const newBalance = (user.balance || 0) + topup.amount;
      await this.userRepository.updateBalance(topup.user_id, newBalance);

      return { message: 'Saldo berhasil ditambahkan', amount: topup.amount };
    }

    if (status === 'EXPIRED' || status === 'FAILED') {
      await this.topupRepository.updateStatus(topup.id, status.toLowerCase());
      return { message: `Topup ${status.toLowerCase()}` };
    }

    return { message: 'Status tidak diproses' };
  }
}

module.exports = HandleTripayWebhook;
