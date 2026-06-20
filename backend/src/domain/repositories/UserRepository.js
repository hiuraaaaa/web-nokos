/**
 * Abstract interface untuk UserRepository.
 * Implementasi konkret ada di infrastructure/persistence/SqliteUserRepository.js
 */
class UserRepository {
  // eslint-disable-next-line no-unused-vars
  async save(user) { throw new Error('Not implemented'); }
  // eslint-disable-next-line no-unused-vars
  async findById(id) { throw new Error('Not implemented'); }
  // eslint-disable-next-line no-unused-vars
  async findByEmail(email) { throw new Error('Not implemented'); }
  // eslint-disable-next-line no-unused-vars
  async findByUsername(username) { throw new Error('Not implemented'); }
  // eslint-disable-next-line no-unused-vars
  async updateBalance(id, newBalance) { throw new Error('Not implemented'); }
}

module.exports = UserRepository;
