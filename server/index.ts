import path from 'path';
import express from 'express';
import cors from 'cors';
import prisma from './database/db';
import passport from 'passport';
import session from 'express-session';
const socket = require('socket.io');
require('dotenv').config();


import api from './routes/index';

const app = express();
app.use(cors());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

//ROUTERS------------------------------
app.use('/api', api);

// GOOGLE AUTH-----------------

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
app.use(passport.session());

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  (async (req: any, accessToken: any, refreshToken: any, profile: { id: any; emails: { value: any; }[]; displayName: any; photos: { value: any; }[]; }, cb: (arg0: undefined, arg1: undefined) => any) => {
    await prisma.users.create(
      {
        data: {
          id: profile.id,
          email: profile.emails[0].value,
          fullName: profile.displayName,
          profileURL: profile.photos[0].value,
        }
      })
      .catch(async () => {
        return await prisma.users.findUnique({
          where: {
            id: profile.id,
          },
        });
      });

    cb(null, profile);
  }),
));

passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  // The USER object is the "authenticated user" from the done() in authUser function.
  // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.
  done(null, user);
});

passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

  done(null, user);
});


const isLoggedIn = (req: { user: any; }, res: { sendStatus: (arg0: number) => any; }, next: () => any) => {
  req.user ? next() : res.sendStatus(401);
};

app.get('/hidden', isLoggedIn, (req, res) => {
  const userObj = req.user;

  prisma.users.findUnique({ where: { id: userObj.id }})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(err => console.error(err));
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

app.post('/logout', (req, res) => {
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

const server = app.listen(PORT, () => {
  console.info(`App listening on port http://localhost:${PORT}`);
});


const io = socket(server, {
  cors: {
    origin: '/',
    credentials: true
  }
});

global.onlineUsers = new Map();

io.on('connection', (socket: { on: (arg0: string, arg1: { (userId: any): void; (data: any): void; }) => void; id: any; to: (arg0: any) => { (): any; new(): any; emit: { (arg0: string, arg1: any): void; new(): any; }; }; }) => {
  global.chatSocket = socket;
  console.log('user added');
  socket.on('add-user', (userId: any) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data: { receiverId: string;}) => {
    const sendUserSocket = onlineUsers.get(data.receiverId);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-receive', data);
    }
  });

  socket.on('send-noti', (data: {receiverId: string;}) => {
    console.log('notification sent');
    const sendUserSocket = onlineUsers.get(data.receiverId);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('noti-receive', data);
    }
  })
});
