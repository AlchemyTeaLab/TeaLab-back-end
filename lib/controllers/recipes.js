const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Recipe = require('../models/Recipe');

module.exports = Router()
  // GET all recipes
  .get('/', authenticate, async (req, res, next) => {
    try {
      const recipesArray = await Recipe.getAllRecipes();

      res.send(recipesArray);
    } catch (error) {
      next(error);
    }
  })

  // GET number of recipes
  .get('/count', async (req, res, next) => {
    try {
      const recipes = await Recipe.getNumberOfRecipes();
      res.send(recipes);
    } catch (error) {
      next(error);
    }
  })

  // CREATE a recipe
  .post('/', authenticate, async (req, res, next) => {
    try {
      const recipe = await Recipe.insert(req.body);
      await recipe.addIngredientsById();
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

  // UPDATE recipe by recipe id
  .patch('/:id', authenticate, async (req, res, next) => {
    try {
      const recipe = await Recipe.updateRecipeById(req.params.id, req.body);
      res.send(recipe);
    } catch (error) {
      next(error);
    }
  })

  // GET recipe by recipe id
  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const recipe = await Recipe.getRecipeById(req.params.id);
      await recipe.addIngredientsById();
      if (!recipe) res.send({ message: 'No current recipe available' });
      res.send(recipe);
    } catch (error) {
      next(error);
    }
  })

  // DELETE recipe by recipe id
  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      await Recipe.deleteRecipeById(req.params.id);
      res.send({ message: 'You have successfully deleted a tea recipe' });
    } catch (error) {
      next(error);
    }
  });
