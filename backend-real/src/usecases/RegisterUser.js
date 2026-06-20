const { createUser } = require('../domain/entities/User');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ username, email, password }) {
    // Validasi duplikat
    const existingEmail = await this.userRepository.findByEmail(email);
    if (existingEmail) {
      const err = new Error('Email sudah terdaftar');
      err.status = 409;
      throw err;
    }

    const existingUsername = await this.userRepository.findByUsername(username);
    if (existingUsername) {
      const err = new Error('Username sudah dipakai');
      err.status = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = createUser({
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      balance: 0,
      role: 'user',
      createdAt: new Date().toISOString(),
    });

    await this.userRepository.save(user);

    // Jangan return password
    const { password: _, ...safeUser } = user;
    return safeUser;
  }
}

module.exports = RegisterUser;
