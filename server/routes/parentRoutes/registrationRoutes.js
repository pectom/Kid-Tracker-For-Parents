const express = require('express');
const registartionRouter = express.Router();
const mongoose = require('mongoose');
const {generatePassword} = require('../../utils/passwordManager');

const User = mongoose.model('users');
const ChildUser = mongoose.model('child-users');

registartionRouter.post('/api/registration',(req,res,next) =>{
    const {email, password,firstName,lastName} = req.body;
    if(email && password &&
        firstName && lastName){
            
        const userData = User({
            email: email,
            firstName: firstName,
            lastName: lastName
        });

        userData.password = userData.generateHash(password);
        userData.googleId = undefined;

        User.create(userData, (err,user) => {
           if(err){
               console.log(err.message);
               return next(err);
           } else {
               res.send(user);
           }
        });
    } else {
        return next(new Error("Wrong parameters"));
    }

});
registartionRouter.post('/api/registration/child',async (req,res,next) =>{
    const {email, password} = req.body;
    if(email && password){
    try{
        const childData = ChildUser({
            email: email,
            password: await generatePassword(password)
        });

        const child = await ChildUser.create(childData);
        res.send(child);

    }catch (e) {
        console.log(e);
        res.status(400).send("Something went wrong");
    }

    } else {
        res.status(404).send("Incomplete request");
    }

});
module.exports = registartionRouter;