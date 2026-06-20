const OrderRepository = require('../../domain/repositories/OrderRepository');
const db = require('./db');

class SqliteOrderRepository extends OrderRepository {
  async save(order) {
    db.prepare(`
      INSERT INTO orders (order_id, user_id, phone_number, service, country, operator, price, price_formatted, status, created_at, expired_at)
      VALUES (@orderId, @userId, @phoneNumber, @service, @country, @operator, @price, @priceFormatted, @status, @createdAt, @expiredAt)
    `).run({
      orderId: order.orderId,
      userId: order.userId || null,
      phoneNumber: order.phoneNumber || null,
      service: order.service || null,
      country: order.country || null,
      operator: order.operator || null,
      price: order.price || 0,
      priceFormatted: order.priceFormatted || null,
      status: order.status || 'pending',
      createdAt: order.createdAt || new Date().toISOString(),
      expiredAt: order.expiredAt || null,
    });
    return order;
  }

  async update(orderId, partial) {
    const fields = Object.keys(partial)
      .map((k) => {
        // camelCase → snake_case
        const col = k.replace(/([A-Z])/g, '_$1').toLowerCase();
        return `${col} = @${k}`;
      })
      .join(', ');

    db.prepare(`UPDATE orders SET ${fields} WHERE order_id = @orderId`).run({
      ...partial,
      orderId,
    });

    return this.findById(orderId);
  }

  async findById(orderId) {
    return db.prepare('SELECT * FROM orders WHERE order_id = ?').get(orderId) || null;
  }

  async findAll() {
    return db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  }

  async findByUserId(userId) {
    return db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(userId);
  }
}

module.exports = SqliteOrderRepository;
