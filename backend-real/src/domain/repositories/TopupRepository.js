/**
 * Abstract interface untuk TopupRepository.
 */
class TopupRepository {
  // eslint-disable-next-line no-unused-vars
  async save(topup) { throw new Error('Not implemented'); }
  // eslint-disable-next-line no-unused-vars
  async findById(id) { throw new Error('Not implemented'); }
  // eslint-disable-next-line no-unused-vars
  async findByTripayRef(tripayRef) { throw new Error('Not implemented'); }
  // eslint-disable-next-line no-unused-vars
  async findByUserId(userId) { throw new Error('Not implemented'); }
  // eslint-disable-next-line no-unused-vars
  async updateStatus(id, status, paidAt) { throw new Error('Not implemented'); }
}

module.exports = TopupRepository;
