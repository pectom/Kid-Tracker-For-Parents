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

authRouter.post('/local',
    passport.authenticate("parent-local",{ failureRedirect: '/login' }),
    (req,res) => {
        res.send(req.user);
    });
authRouter.post('/local/child',
    passport.authenticate("child-local",{ failureRedirect: '/login' }),
    (req,res) => {
        res.send(req.user);
    });

authRouter.post('/child/token', passport.authenticate('child-token'),
    (req, res) => {
        res.send(req.user);
    });
authRouter.post('/parent/token', passport.authenticate('parent-token'),
    (req, res) => {
        res.send(req.user);
    });
module.exports = authRouter;