// Router (.post: validate, cookies, .get: /me, .delete: clearCookies)
const { Router } = require('express');
const UserService = require('../services/UserService');
// const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      console.log('USER', user);

      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  // Log in a user & cookies
  .post('/session', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userToken = await UserService.signIn({ email, password });
      console.log('USER TOKEN', userToken);
      res.cookie(process.env.COOKIE_NAME, userToken, {});
    } catch (error) {}
  });
