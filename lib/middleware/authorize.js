module.exports = async (req, res, next) => {
  try {
    if (!req.user || req.user.email !== 'admin@tealab.com')
      throw new Error('Must be admin to access an ingredient');
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
