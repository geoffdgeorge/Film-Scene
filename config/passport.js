const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const db = require('../models');

const { User } = db;

passport.use(
  new GoogleStrategy(
    {
      // options for the strategy
      callbackURL: '/auth/google/redirect',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      new User({
        username: profile.displayName,
        googleId: profile.id,
      })
        .save()
        .then((newUser) => {
          console.log(`User added! Details: ${newUser}`);
        });
    },
  ),
);
