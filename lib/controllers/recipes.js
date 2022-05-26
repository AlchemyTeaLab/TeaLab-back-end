const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Recipe = require('../models/Recipe');

module.exports = Router()
  //GET all recipes
  .get('/', authenticate, async (req, res, next) => {
    try {
      const recipesArray = await Recipe.getAllRecipes();
      console.log('RECIPES', recipesArray);
      res.send(recipesArray);
    } catch (error) {
      next(error);
    }
  });
