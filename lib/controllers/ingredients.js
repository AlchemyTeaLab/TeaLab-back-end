// .post .get .update .delete
const { Router } = require('express');
const authorize = require('../middleware/authorize');
const authenticate = require('../middleware/authenticate');
const Ingredient = require('../models/Ingredient');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const ingredientsArray = await Ingredient.getAllIngredients();

      res.send(ingredientsArray);
    } catch(err) {
      next(err);
    }
  })

  .post('/', authenticate, authorize, async (req, res, next) => {
    try {
      const newIngredient = await Ingredient.insert(req.body);
      
      res.send(newIngredient);
    } catch(err) {
      next(next);
    }
  });
