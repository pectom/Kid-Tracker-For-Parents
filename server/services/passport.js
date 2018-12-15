const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;

const parentGoogleAuth = require('../utils/parentGoogleAuth');
const childGoogleAuth = require('../utils/childGoogleAuth');
const {validPassword} = require('../utils/passwordManager');

const mongoose = require('mongoose');
const User = mongoose.model('users');
const ChildUser = mongoose.model('child-users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            if(user){
                done(null,user)
            }else
            {
                ChildUser.findById(id)
                    .then(user => {
                        done(null,user)
                    })
            }
        });
});
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
        proxy: true
    },parentGoogleAuth)
);
//lokalne logowanie rodzica
passport.use("parent-local",new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    async (req, email, password, done) => {
        try{
            const user = await User.findOne({ email: email });
            if(!user) {
                return done("wrong email",false);
            }
            if(!(await validPassword(user.password,password))){
                return done("wrong password",false);
            }
            return done(null,user)

        }catch (e) {
            console.log(e);
            done(e, false);
        }}
));
//lokalne logowanie dziecka
passport.use("child-local",new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    async(req, email, password, done) => {
    try{
        const child = await ChildUser.findOne({ email: email });
        if(!child) {
            return done("wrong email",false);
        }
        if(!(await validPassword(child.password,password))){
            return done("wrong password",false);
        }else {
            return done(null,child);
        }
    }catch (e) {
        console.log(e);
        done(e,false);
    }

    }
));

passport.use('parent-token',new GoogleTokenStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret
    },parentGoogleAuth
));
passport.use('child-token',new GoogleTokenStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret
    },childGoogleAuth
));