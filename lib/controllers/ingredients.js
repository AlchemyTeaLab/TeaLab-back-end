// .post .get .update .delete
const { Router } = require('express');
const Ingredient = require('../models/Ingredient');

module.exports = Router()
  .get('/ingredients', async (req, res, next) => {
    try {
      const ingredientsArray = await Ingredient.getAllIngredients();

      res.send(ingredientsArray);
    } catch(err) {
      next(error);
    }
  });