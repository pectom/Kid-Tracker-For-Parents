const passport = require('passport');
const express = require('express');

const authRouter = express.Router();

authRouter.get('/google',
    passport.authenticate("google", { scope: ['profile'] }));

authRouter.get('/google/callback',
    passport.authenticate("google", { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
                res.redirect('/dashboard');
    });

authRouter.post('/parent/local/',
    passport.authenticate("parent-local",{ failureRedirect: '/login' }),
    (req,res) => {
        res.send(req.user);
    });
authRouter.post('/child/local/',
    passport.authenticate("child-local",{ failureRedirect: '/login' }),
    (req,res) => {
        res.send(req.user);
    });

authRouter.post('p/child/', passport.authenticate('child-token'),
    (req, res) => {
        res.send(req.user);
    });
authRouter.post('/parent/token', passport.authenticate('parent-token'),
    (req, res) => {
        res.send(req.user);
    });
module.exports = authRouter;