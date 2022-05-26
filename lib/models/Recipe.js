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
};
