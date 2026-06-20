const TopupRepository = require('../../domain/repositories/TopupRepository');
const db = require('./db');

class SqliteTopupRepository extends TopupRepository {
  async save(topup) {
    db.prepare(`
      INSERT INTO topups (id, user_id, amount, fee, status, payment_method, tripay_ref, tripay_channel, pay_url, created_at)
      VALUES (@id, @userId, @amount, @fee, @status, @paymentMethod, @tripayRef, @tripayChannel, @payUrl, @createdAt)
    `).run({
      id: topup.id,
      userId: topup.userId,
      amount: topup.amount,
      fee: topup.fee || 0,
      status: topup.status || 'pending',
      paymentMethod: topup.paymentMethod || null,
      tripayRef: topup.tripayRef || null,
      tripayChannel: topup.tripayChannel || null,
      payUrl: topup.payUrl || null,
      createdAt: topup.createdAt || new Date().toISOString(),
    });
    return topup;
  }

  async findById(id) {
    return db.prepare('SELECT * FROM topups WHERE id = ?').get(id) || null;
  }

  async findByTripayRef(tripayRef) {
    return db.prepare('SELECT * FROM topups WHERE tripay_ref = ?').get(tripayRef) || null;
  }

  async findByUserId(userId) {
    return db.prepare('SELECT * FROM topups WHERE user_id = ? ORDER BY created_at DESC').all(userId);
  }

  async updateStatus(id, status, paidAt = null) {
    db.prepare('UPDATE topups SET status = ?, paid_at = ? WHERE id = ?').run(status, paidAt, id);
  }
}

module.exports = SqliteTopupRepository;
