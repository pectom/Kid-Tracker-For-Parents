const express = require('express');
const registartionRouter = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('users');


registartionRouter.post('/api/registration',(req,res,next) =>{
    if(req.body.email && req.body.password &&
        req.body.firstName && req.body.lastName){
            
        const userData = User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        userData.password = userData.generateHash(req.body.password);
        userData.googleId = undefined;

        User.create(userData, (err,user) => {
           if(err){
               console.log(err.message);
               return next(err);
           } else {
               res.send();
           }
        });
    } else {
        return next(new Error("Wrong parameters"));
    }

});

module.exports = registartionRouter;