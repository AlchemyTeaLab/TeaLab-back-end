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
};
