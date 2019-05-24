const router = require('express').Router();
const passport = require('passport');

// Auth Login
router.get('/login', (req, res) => {
  res.render('login');
});

// Auth Logout
router.get('/logout', (req, res) => {
  // Handle with Passport
  res.send('logging out');
});

// Auth with Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  }),
);

// Callback for Google Redirect
router.get('/google/redirect', (req, res) => {
  res.send(`You've reached the callback URI`)
})

module.exports = router;
