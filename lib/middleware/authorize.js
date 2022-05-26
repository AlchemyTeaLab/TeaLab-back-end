// Check req.user to ensure the user's email is 'admin@tealab.com'
module.exports = async (req, res, next) => {
  try {
    if (!req.user || req.user.email !== 'admin@tealab.com')
      throw new Error('Must be admin to create an ingredient');
    next();
  } catch (err) {
    err.status = 404;
    next(err);
  }
};
