const pool = require('../utils/pool');

module.exports = class Recipe {
  id;
  name;
  userId;
  notes;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.userId = row.user_id;
    this.notes = row.notes;
    this.createdAt = row.created_at;
  }

  static async getAllRecipes() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        recipes
      `
    );
    return rows.map((row) => new Recipe(row));
  }

  static async insert({ name, userId, notes }) {
    try {
      const { rows } = await pool.query(
        `
        INSERT INTO
          recipes (
            name, 
            user_id, 
            notes
          )
        VALUES
          ($1, $2, $3)
        RETURNING
          *
        `,
        [name, userId, notes]
      );

      return new Recipe(rows[0]);
    } catch (error) {
      return error;
    }
  }
};
