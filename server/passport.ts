require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')

passport.use(new GoogleStrategy({
  clientID: process.env.
  clientSecret: process.env.
  
}))