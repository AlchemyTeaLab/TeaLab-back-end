// Router (.post: validate, cookies, .get: /me, .delete: clearCookies)
const { Router } = require('express');
const UserService = require('../services/UserService');
// const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);

      res.send(user);
      
    } catch (error) {
      next(error);
    }
  });
