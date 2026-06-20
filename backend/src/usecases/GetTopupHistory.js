class GetTopupHistory {
  constructor(topupRepository) {
    this.topupRepository = topupRepository;
  }

  async execute(userId) {
    return this.topupRepository.findByUserId(userId);
  }
}

module.exports = GetTopupHistory;
