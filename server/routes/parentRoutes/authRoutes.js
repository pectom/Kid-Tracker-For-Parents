const passport = require('passport');
const express = require('express');

const mongoose = require('mongoose');
const User = mongoose.model("users");

const authRouter = express.Router();

authRouter.get('/google',
    passport.authenticate("google", { scope: ['profile'] }));

authRouter.get('/google/callback',
    passport.authenticate("google", { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/dashboard');
    });

authRouter.post('/local/',
    passport.authenticate("parent-local",{ failureRedirect: '/login' }),
    async (req,res) => {
        try {
            const {firebaseToken} = req.body;
            if(firebaseToken){
                req.user.firebaseToken = firebaseToken;
                const user = await req.user.save();
                return res.send(user);
            }
            res.send(req.user);
        }catch (e) {
            console.log(e);
            res.status(400).send(e.message);
        }
    });

module.exports =  authRouter;