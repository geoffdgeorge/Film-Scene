// Dependencies
require('dotenv').config()
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const passportSetup = require('./config/passport');
const htmlRoutes = require('./routes/htmlRoutes');
const authRoutes= require('./routes/authRoutes');

// Express Setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Mongoose Setup
mongoose.connect('mongodb://localhost/unit18Populater', {
  useNewUrlParser: true,
});

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());

// Handlebars Setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// Routing Setup
app.use('/', htmlRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
