class GetUserById {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      const err = new Error('User tidak ditemukan');
      err.status = 404;
      throw err;
    }
    const { password: _, ...safeUser } = user;
    return safeUser;
  }
}

module.exports = GetUserById;
