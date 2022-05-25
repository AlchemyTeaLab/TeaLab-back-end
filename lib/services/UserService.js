// class UserService (create: email/username/passHash, validate/find: bcrypt)
const User = require('../models/User');
const bcrypt = require('bcryptjs');


module.exports = class UserService {
  static async create({ username, email, password }) {
    let user = await User.findByUsername(username);

    if (user) {
      throw new Error('username already in use');
    }

    if (!user) {
      const passwordHash = bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS)
      );
  
      user = await User.insert({
        username,
        email,
        passwordHash
      });
    }
    return user;
  }
};
