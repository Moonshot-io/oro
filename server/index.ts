import path from 'path';
import express from 'express';
import prisma from './database/db';
import passport from 'passport';
import session from 'express-session';

import eventListingsRouter from './routes/eventListingsRouter';
import artistsRouter from './routes/artistsRouter';
import songFinderRouter from './routes/songFinder';
import eventDetailsRouter from './routes/eventDetail';

import profileRouter from './routes/profile';

import eventFeedRouter from './routes/eventFeed';
import profileRouter from './routes/profile';
import commentsRouter from './routes/comments';
import prisma from './database/db';
import passport from 'passport';


// console.log('index server');
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

//ROUTERS------------------------------
app.use('/events', eventListingsRouter);
app.use('/favArtists', artistsRouter);
app.use('/songs', songFinderRouter);
app.use('/eventDetails', eventDetailsRouter);
// app.use('/auth', app);
app.use('/profile', profileRouter);
app.use('/comments', commentsRouter);
app.use('/eventFeed', eventFeedRouter);

// AUTH-----------------
require('dotenv').config();

import passport from 'passport';
import googleStrategy from 'passport-google-oauth20';
const GoogleStrategy = googleStrategy.Strategy;
import prisma from './database/db';

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// console.log('passport file');
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  (async (req: any, accessToken: any, refreshToken: any, profile: { id: any; emails: { value: any; }[]; displayName: any; photos: { value: any; }[]; }, cb: (arg0: undefined, arg1: undefined) => any) => {
    // console.log('profile here----', profile);
    await prisma.users.create(
      {
        data: {
          googleId: profile.id,
          email: profile.emails[0].value,
          fullName: profile.displayName,
          profileURL: profile.photos[0].value,
        }
      })
      .catch(async () => {
        return await prisma.users.findUnique({
          where: {
            googleId: profile.id,
          },
        });
      });
    
      cb(null, profile);
  }),
));

passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  console.log(`\n--------> Serialize User:`)
  console.log(user)
  // The USER object is the "authenticated user" from the done() in authUser function.
  // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.
  done(null, user);
});

passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  console.log("\n--------- Deserialized User:")
  console.log(user)
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

  done(null, user);
});


const isLoggedIn = (req: {
  isAuthenticated: any; user: any;
}, res: { sendStatus: (arg0: number) => any; }, next: () => any) => {
  req.isAuthenticated ? next() : res.sendStatus(401);
};

app.get('/auth/success', (req, res) => {
  // console.log('auth success');
  if (req.user) {
    // console.log(req.user);
    res.status(200).json({
      user: req.user,
      message: 'success',
      success: true,
    });
  }
});

app.get('/hidden', isLoggedIn, (req, res) => {
  res.send(req.user);
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/login',
  }), 
  (req, res) => {
    console.log('google callback req -----------> ', req);
  }
);

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
