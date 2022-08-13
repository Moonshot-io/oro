require('dotenv').config();

import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import prisma from './database/db';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
  passReqToCallback: true
},
  ((accessToken, refreshToken, profile, done) => {
    console.log(profile);
    return done(null, profile);
  }),
));

passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  done(null, user);
})

passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  done(null, user);
})


