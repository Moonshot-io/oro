// import { Router } from 'express';
// import passport from 'passport';
// // import passportAuth from '../passport';
// import session from 'express-session';
// require('../passport');
// console.log('auth file');
// const authRouter = Router();
// // passportAuth();
// authRouter.use(
//   session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//   }),
// );
// authRouter.use(passport.initialize());
// authRouter.use(passport.session());

// const isLoggedIn = (req: { user: any; }, res: { sendStatus: (arg0: number) => any; }, next: () => any) => {
//   req.user ? next() : res.sendStatus(401);
// };

// authRouter.get('/auth/success', (req, res) => {
//   console.log('auth success');
//   if (req.user) {
//     // console.log(req.user);
//     res.status(200).json({
//       user: req.user,
//       message: 'success',
//       success: true,
//     });
//   }
// });

// authRouter.get(
//   'auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }),
//   (req, res) => {
//     console.log('auth get', req, res);
//   }
// );
// authRouter.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/',
//     successRedirect: '/',
//   }),
//   (req, res) => {
//     // Successful authentication, redirect secrets.
//     console.log('auth redirect', req, res);
//   },
// );


// authRouter.get('/logout', (req, res) => {
//   req.logout(() => {
//     res.redirect('/');
//   });
// });

// export default authRouter;
