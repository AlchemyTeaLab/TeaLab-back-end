const { Router } = require('express');
const UserService = require('../services/UserService');
const authenticate = require('../middleware/authenticate');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const IS_DEPLOYED = process.env.NODE_ENV === 'production';

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const { user, webToken } = await UserService.create(req.body);
      res.setHeader('Referrer-Policy', 'origin-when-cross-origin');
      res
        .cookie(process.env.COOKIE_NAME, webToken, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
          sameSite: IS_DEPLOYED ? 'none' : 'strict',
          secure: IS_DEPLOYED,
        })
        .send({ message: 'Successfully, signed up!', user });
    } catch (error) {
      next(error);
    }
  })

  .post('/session', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { user, webToken } = await UserService.signIn({ email, password });
      res
        .cookie(process.env.COOKIE_NAME, webToken, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
          sameSite: IS_DEPLOYED ? 'none' : 'strict',
          secure: IS_DEPLOYED,
        })
        .send({ message: 'Successfully signed in!', user });
    } catch (error) {
      next(error);
    }
  })

  .get('/me', authenticate, async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  })

  .delete('/session', async (req, res, next) => {
    try {
      res
        .clearCookie(process.env.COOKIE_NAME)
        .json({ success: true, message: 'Successfully signed out!' });
    } catch (error) {
      next(error);
    }
  });
