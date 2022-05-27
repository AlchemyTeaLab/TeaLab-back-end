const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Recipe = require('../models/Recipe');

module.exports = Router()
  //GET all recipes
  .get('/', authenticate, async (req, res, next) => {
    try {
      const recipesArray = await Recipe.getAllRecipes();

      res.send(recipesArray);
    } catch (error) {
      next(error);
    }
  })

  // CREATE a recipe
  .post('/', authenticate, async (req, res, next) => {
    try {
      const recipe = await Recipe.insert(req.body);
      res.send(recipe);
    } catch (error) {
      next(error);
    }
  })

  // GET recipes by user id
  .get('/users/:user_id', authenticate, async (req, res, next) => {
    try {
      const userRecipes = await Recipe.getRecipesByUserId(req.params.user_id);
      if (!userRecipes) res.send({ message: 'This user has no tea recipes' });
      res.send(userRecipes);
    } catch (error) {
      next(error);
    }
  })

  // UPDATE recipes by recipe id
  .patch('/:id', authenticate, async (req, res, next) => {
    try {
      const recipe = await Recipe.updateRecipeById(req.params.id, req.body);
      res.send(recipe);
    } catch (error) {
      next(error);
    }
  });
