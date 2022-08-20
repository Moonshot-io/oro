import path from 'path';
import express from 'express';
import prisma from './database/db';
import passport from 'passport';
import session from 'express-session';
import {Server} from 'socket.io';
require('dotenv').config();

import api from './routes/index';

// import eventListingsRouter from './routes/eventListingsRouter';
// import artistsRouter from './routes/artistsRouter';
// import songFinderRouter from './routes/songFinder';
// import eventDetailsRouter from './routes/eventDetail';
// import travelPlannerRouter from './routes/travelPlanner';
// import profileRouter from './routes/profile';

// import eventFeedRouter from './routes/eventFeed';
// import profileRouter from './routes/profile';
// import commentsRouter from './routes/comments';
// import usersRouter from './routes/usersRouter'
import prisma from './database/db';
import passport from 'passport';


// console.log('index server');
const app = express();
const io = new Server({
  cors: {
    origin: 'http://localhost:5000'
  }
});

io.on('connection', (socket) => {
  console.log('someone has connected');

  socket.on('disconnect', () => {
    console.log('someone has left');
  })
});

io.listen(3000);




app.use(express.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

//ROUTERS------------------------------
app.use('/api', api);

 
// app.use('/events', eventListingsRouter);
// app.use('/favArtists', artistsRouter);
// app.use('/songs', songFinderRouter);
// app.use('/eventDetails', eventDetailsRouter);
// app.use('/profile', profileRouter);
// app.use('/comments', commentsRouter);
// app.use('/eventFeed', eventFeedRouter);
// app.use('/travelPlanner', travelPlannerRouter);
// app.use('/users', usersRouter);

// AUTH-----------------
// require('dotenv').config();

import googleStrategy from 'passport-google-oauth20';
const GoogleStrategy = googleStrategy.Strategy;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session()) // Why did you remove me Vincent?!

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
  // console.log(`\n--------> Serialize User:`)
  // console.log(user)
  // The USER object is the "authenticated user" from the done() in authUser function.
  // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.
  done(null, user);
});

passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  // console.log("\n--------- Deserialized User:")
  // console.log(user)
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

  done(null, user);
});


const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.get('/hidden', isLoggedIn, (req, res) => {
  res.send(req.user);
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], accessType: 'offline', prompt: 'consent' })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
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
