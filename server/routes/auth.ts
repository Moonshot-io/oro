import { Router } from 'express';
import passport from 'passport';
import passportAuth from '../passport';
import session from 'express-session'
import { QrCodeScannerOutlined } from '@mui/icons-material';

const successLoginUrl = 'http://localhost:5000/'

const authRouter = Router();
authRouter.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
authRouter.use(passport.initialize());
authRouter.use(passport.session());
passportAuth();

const isLoggedIn = (req: { user: any; }, res: { sendStatus: (arg0: number) => any; }, next: () => any) => {
  req.user ? next() : res.sendStatus(401);
};

authRouter.get('/', (_req, res) => {
  res.send('<a href="/auth/auth/google">Authenticate with Google</a>');
});

authRouter.get('/auth/google',
  passport.authenticate("google", { scope: ['profile', 'email'] }),
);

authRouter.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    console.log(req);
  }
);

authRouter.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
})

export default authRouter;