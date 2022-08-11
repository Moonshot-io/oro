import { Router } from 'express';
import passport from 'passport';
import passportAuth from '../passport';
// import session from 'express-session';
// require('../passport');
 
const authRouter = Router();
passportAuth();

const isLoggedIn = (req: { user: any; }, res: { sendStatus: (arg0: number) => any; }, next: () => any) => {
 req.user ? next() : res.sendStatus(401);
};

 
authRouter.get('/', (_req, res) => {
 res.send('<a href="/auth/google">Authenticate with Google</a>');
});
 
authRouter.get('/auth/google',
  passport.authenticate("google", { scope: ['profile', 'email'] }),
);
 
// authRouter.get('/auth/google/callback',
//  passport.authenticate('google', {
//    successRedirect: '/protected',
//    failureRedirect: '/auth/failure',
//  })
// )
 
// authRouter.get('/auth/failure', (_req, res) => {
//  res.send('something went wrong...');
// })
 
// authRouter.get('/protected', isLoggedIn, (_req, res) => {
//  res.send('Hello!');
// });
 
export default authRouter;