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

  async addIngredientsById(ingredientId) {
    const { rows } = await pool.query(
      `INSERT INTO
        ingredients_recipes(ingredient_id, recipe_id)
      VALUES
        ($1, $2)
      `,
      [this.id, ingredientId]
    );
    return rows[0];
  }

  static async getRecipeById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
       recipes
      WHERE
        id=$1
      `,
      [id]
    );
    if (!rows[0]) return null;
    return new Recipe(rows[0]);
  }

  static async getRecipesByUserId(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
       recipes
      WHERE
        id=$1
      `,
      [id]
    );
    if (!rows[0]) return null;
    return rows.map((row) => new Recipe(row));
  }

  static async updateRecipeById(id, attributes) {
    const originalRecipe = await Recipe.getRecipeById(id);
    if (!originalRecipe) return null;
    const { name, userId, notes } = {
      ...originalRecipe,
      ...attributes,
    };

    const { rows } = await pool.query(
      `
      UPDATE
        recipes
      SET
        name=$1,
        user_id=$2,
        notes=$3
      WHERE
        id=$4
      RETURNING
        *
      `,
      [name, userId, notes]
    );
    if (!rows[0]) return null;
    return new Recipe(rows[0]);
  }
};
