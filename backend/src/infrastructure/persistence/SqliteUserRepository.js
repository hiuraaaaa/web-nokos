const UserRepository = require('../../domain/repositories/UserRepository');
const { createUser } = require('../../domain/entities/User');
const db = require('./db');

class SqliteUserRepository extends UserRepository {
  _toEntity(row) {
    if (!row) return null;
    return createUser({
      id: row.id,
      username: row.username,
      email: row.email,
      password: row.password,
      balance: row.balance,
      role: row.role,
      createdAt: row.created_at,
    });
  }

  async save(user) {
    db.prepare(`
      INSERT INTO users (id, username, email, password, balance, role, created_at)
      VALUES (@id, @username, @email, @password, @balance, @role, @createdAt)
    `).run({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      balance: user.balance,
      role: user.role,
      createdAt: user.createdAt || new Date().toISOString(),
    });
    return user;
  }

  async findById(id) {
    return this._toEntity(db.prepare('SELECT * FROM users WHERE id = ?').get(id));
  }

  async findByEmail(email) {
    return this._toEntity(db.prepare('SELECT * FROM users WHERE email = ?').get(email));
  }

  async findByUsername(username) {
    return this._toEntity(db.prepare('SELECT * FROM users WHERE username = ?').get(username));
  }

  async updateBalance(id, newBalance) {
    db.prepare('UPDATE users SET balance = ? WHERE id = ?').run(newBalance, id);
  }
}

module.exports = SqliteUserRepository;
