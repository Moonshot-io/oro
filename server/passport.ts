// require('dotenv').config();

// import passport from 'passport';
// import googleStrategy from 'passport-google-oauth20';
// const GoogleStrategy = googleStrategy.Strategy;
// import prisma from './database/db';

// console.log('passport file');
// passport.use(new GoogleStrategy(
//   {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/auth/google/callback',
//     // userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
//   },
//   (async (req, accessToken, refreshToken, profile, cb ) => {
//     console.log('profile here----', profile);
//     await prisma.users.create(
//       { data: {
//         googleId: profile.id,
//         email: profile.emails[0].value,
//         fullName: profile.displayName,
//       }}, (err, user) => cb(err, user));
//   }),
// ));

// passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
//   done(null, user);
// });

// passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
//   done(null, user);
// });
