const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      const err = new Error('Email atau password salah');
      err.status = 401;
      throw err;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      const err = new Error('Email atau password salah');
      err.status = 401;
      throw err;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      env.jwtSecret,
      { expiresIn: '7d' }
    );

    const { password: _, ...safeUser } = user;
    return { token, user: safeUser };
  }
}

module.exports = LoginUser;
