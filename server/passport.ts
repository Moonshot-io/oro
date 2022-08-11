require('dotenv').config();

// var passport = require("passport");
// var GoogleStrategy = require("passport-google-oauth20").Strategy;

import passport from 'passport';
import GoogleStrategy, { Strategy } from 'passport-google-oauth20';


passport.use(new GoogleStrategy.Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
},
  (_request: any, _accessToken: any, _refreshToken: any, profile: any, done: (arg0: any, arg1: any) => any) => {
    return done(err, profile);
  }
));

passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  done(null, user);
})

passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  done(null, user);
})

function err(err: any, profile: any) {
  throw new Error('Function not implemented.');
}

