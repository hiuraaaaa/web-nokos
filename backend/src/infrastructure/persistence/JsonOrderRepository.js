const fs = require('fs');
const path = require('path');
const OrderRepository = require('../../domain/repositories/OrderRepository');
const env = require('../../config/env');

class JsonOrderRepository extends OrderRepository {
  constructor(dbPath = env.dbPath) {
    super();
    this.dbPath = path.resolve(dbPath);
    this._writeQueue = Promise.resolve();
    this._ensureFile();
  }

  _ensureFile() {
    const dir = path.dirname(this.dbPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(this.dbPath)) fs.writeFileSync(this.dbPath, '[]', 'utf-8');
  }

  _read() {
    const raw = fs.readFileSync(this.dbPath, 'utf-8');
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  _write(orders) {
    // Diantrekan biar gak ada dua request bersamaan yang saling timpa file JSON.
    this._writeQueue = this._writeQueue.then(() =>
      fs.promises.writeFile(this.dbPath, JSON.stringify(orders, null, 2), 'utf-8')
    );
    return this._writeQueue;
  }

  async save(order) {
    const orders = this._read();
    orders.push(order);
    await this._write(orders);
    return order;
  }

  async update(orderId, partialOrder) {
    const orders = this._read();
    const idx = orders.findIndex((o) => o.orderId === orderId);
    if (idx === -1) return null;
    orders[idx] = { ...orders[idx], ...partialOrder };
    await this._write(orders);
    return orders[idx];
  }

  async findById(orderId) {
    return this._read().find((o) => o.orderId === orderId) || null;
  }

  async findAll() {
    return this._read();
  }
}

module.exports = JsonOrderRepository;
