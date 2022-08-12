require('dotenv').config();

import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

const passportAuth = () => {
  
  passport.use(new GoogleStrategy.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
    (_request: any, _accessToken: any, _refreshToken: any, profile: any, done: (arg0: any, arg1: any) => any) => {
      return done(null, profile);
    }
  ));

  passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
    done(null, user);
  })

  passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
    done(null, user);
  })
}

export default passportAuth;

