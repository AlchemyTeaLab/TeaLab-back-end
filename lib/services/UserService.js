// class UserService (create: email/username/passHash, validate/find: bcrypt)
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = class UserService {
  static async create({ username, email, password }) {
    let user = await User.findByUsername(username);

    if (user) {
      throw new Error('username already in use');
    }

    if (!user) {
      const passwordHash = bcrypt.hashSync(
        password,
        Number(process.env.SALT_ROUNDS)
      );

      user = await User.insert({
        username,
        email,
        passwordHash,
      });
    }
    return user;
  }

  static async signIn({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user) throw new Error('Invalid email/password');
    const passwordsMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!passwordsMatch) throw new Error('Invalid email/password');

    const webToken = jwt.sign({ ...user }, process.env.JWT_SECRET);
    return { user, webToken };
  }
};
