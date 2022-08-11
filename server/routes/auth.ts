import { Router } from 'express';
import passport from 'passport';
import { isSymbolObject } from 'util/types';
require('../passport');
 
const authRouter = Router();
 
const isLoggedIn = (req: { user: any; }, res: { sendStatus: (arg0: number) => any; }, next: () => any) => {
 req.user ? next() : res.sendStatus(401);
};
 
authRouter.get('/', (req, res) => {
 res.send('<a href="/auth/google">Authenticate with Google</a>');
});
 
authRouter.get('/auth/google',
 passport.authenticate('google', { scope: ['email', 'profile'] })
);
 
authRouter.get('/google/callback',
 passport.authenticate('google', {
   successRedirect: '/protected',
   failureRedirect: '/auth/failure',
 })
)
 
authRouter.get('/auth/failure', (req, res) => {
 res.send('something went wrong...');
})
 
authRouter.get('/protected', isLoggedIn, (req, res) => {
 res.send('Hello!');
});
 
export default authRouter;