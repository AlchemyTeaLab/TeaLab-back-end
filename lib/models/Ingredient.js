// insert, getAll, getById
const pool = require('../utils/pool');

module.exports = class Ingredient {
  id;
  commonName;
  scientificName;
  image;
  type;
  healthBenefits;
  description;

  constructor(row) {
    this.id = row.id;
    this.commonName = row.common_name;
    this.scientificName = row.scientific_name;
    this.image = row.image;
    this.type = row.type;
    this.healthBenefits = row.health_benefits;
    this.description = row.description;
  }

  static async getAllIngredients() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        ingredients
      `
    );

    return rows.map((row) => new Ingredient(row));
  }

  static async insert({
    commonName,
    scientificName,
    image,
    type,
    healthBenefits,
    description,
  }) {
    try {
      const { rows } = await pool.query(
        `
      INSERT INTO
        ingredients (
          common_name, 
          scientific_name,
          image,
          type,
          health_benefits,
          description
        )
      VALUES
        ($1, $2, $3, $4, $5, $6)
      RETURNING
        *
      `,
        [
          commonName,
          scientificName,
          image,
          type,
          healthBenefits,
          description
        ]
      );
      
      return new Ingredient(rows[0]);
    } catch(err) {
      return(err);
    }
  }

  static async getIngredientById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        ingredients
      WHERE
        id=$1
      `,
      [id]
    );

    return new Ingredient(rows[0]);
  }

  static async updateIngredientById(id, attributes) {
    const ingredient = await Ingredient.getIngredientById(id);
    if (!ingredient) return null;

    const { 
      commonName,
      scientificName,
      image,
      type,
      healthBenefits,
      description 
    } = { ...ingredient, ...attributes };

    const { rows } = await pool.query(
      `
      UPDATE
        ingredients
      SET
        common_name=$1, 
        scientific_name=$2,
        image=$3,
        type=$4,
        health_benefits=$5,
        description=$6
      WHERE
        id=$7
      RETURNING
        *
      `,
      [
        commonName,
        scientificName,
        image,
        type,
        healthBenefits,
        description,
        id
      ]
    );

    if (!rows[0]) return null;
    return new Ingredient(rows[0]);
  }

  static async deleteIngredientById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        ingredients
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    if (!rows[0]) return null;
    return new Ingredient(rows[0]);
  }
};
