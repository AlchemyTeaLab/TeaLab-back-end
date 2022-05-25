// class UserService (create: email/username/passHash, validate/find: bcrypt)
const User = require('../models/User');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { sign } = require('../utils/jwt');

module.exports = class UserService {
  static async create({ username, email, password }) {
    const passwordHash = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      username,
      email,
      passwordHash
    });

    const token = sign(user);

    return { user, token };
  }
}