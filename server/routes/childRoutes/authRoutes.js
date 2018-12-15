const passport = require('passport');
const express = require('express');

const authRouter = express.Router();

authRouter.post('/local/',
    passport.authenticate("child-local",{ failureRedirect: '/login' }),
    (req,res) => {
        res.send(req.user);
    });

module.exports = authRouter;