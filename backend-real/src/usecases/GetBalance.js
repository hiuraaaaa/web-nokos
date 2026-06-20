class GetBalance {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      const err = new Error('User tidak ditemukan');
      err.status = 404;
      throw err;
    }
    return {
      amount: user.balance,
      formatted: 'Rp' + user.balance.toLocaleString('id-ID'),
      username: user.username,
      email: user.email,
    };
  }
}

module.exports = GetBalance;
