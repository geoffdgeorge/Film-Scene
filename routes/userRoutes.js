const router = require('express').Router();

function isAuthenticated(req, res, next) {
  if (!req.user) {
    // If user isn't logged in
    res.redirect('/auth/login');
  } else {
    next();
  }
}

router.get('/', isAuthenticated, (req, res) => {
  res.render('signedin', req.user);
});

module.exports = router;
