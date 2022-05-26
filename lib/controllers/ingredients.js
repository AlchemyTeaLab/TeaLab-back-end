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
  })

  .get('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const ingredient = await Ingredient.getIngredientById(req.params.id);

      res.send(ingredient);
    } catch(err) {
      next(err);
    }
  })

  .patch('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const updateIngredient = await Ingredient.updateIngredientById(req.params.id, req.body);
      
      res.send(updateIngredient);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      await Ingredient.deleteIngredientById(req.params.id);
      res.send({ message: 'Successfully deleted ingredient' });
    } catch(err) {
      next(err);
    }
  });
