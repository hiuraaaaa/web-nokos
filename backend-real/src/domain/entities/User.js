/**
 * Factory function untuk membuat User entity.
 * Balance disimpan dalam satuan rupiah (integer).
 */
function createUser({ id, username, email, password, balance = 0, role = 'user', createdAt }) {
  return Object.freeze({ id, username, email, password, balance, role, createdAt });
}

module.exports = { createUser };
