const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;

const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null,user)
        });
});
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
        proxy: true
    },(accessToken,refreshToken, profile, done) =>{
    console.log(accessToken);
        User.findOne({googleId: profile.id})
        .then((existingUser)=>{
            if(existingUser){
                done(null,existingUser);
            }else {
                new User({googleId: profile.id})
                    .save()
                    .then(user => done(null,user));
            }
        })
    }
    )
);

passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    (req, email, password, done) => {
        User.findOne({ email: email })
            .then((user)  => {
                if(!user) {
                    return done(null,false);
                }
                if(!user.validPassword(user.password,password)){
                    return done(null,false);
                }
                return done(null,user)
        });
    }
));
passport.use('parent',new GoogleTokenStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));
passport.use('child',new GoogleTokenStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));