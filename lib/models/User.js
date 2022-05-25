// pool, class User(contructor, insert, getById, getByUsername)

const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User {
  id;
  username;
  email;
  #passwordHash;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }

  static async insert({ username, email, passwordHash }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        users (username, email, password_hash)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [username, email, passwordHash]
    );

    return new User(rows[0]);
  }

  get passwordHash() {
    return this.#passwordHash;
  }

  authToken() {
    return jwt.sign({ ...this }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });
  }
};
