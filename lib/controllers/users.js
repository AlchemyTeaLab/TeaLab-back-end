// Router (.post: validate, cookies, .get: /me, .delete: clearCookies)
const { Router } = require('express');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const IS_DEPLOYED = process.env.NODE_ENV === 'production';

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
      const { user, webToken } = await UserService.signIn({ email, password });
      console.log('USER TOKEN', user);
      res
        .cookie(process.env.COOKIE_NAME, webToken, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
          sameSite: IS_DEPLOYED ? 'none' : 'strict',
          secure: IS_DEPLOYED,
        })
        .json({ message: 'Successfully signed in!', user });
    } catch (error) {
      next(error);
    }
  })

  // Get A Logged in user from cookie
  .get('/me', async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  });
