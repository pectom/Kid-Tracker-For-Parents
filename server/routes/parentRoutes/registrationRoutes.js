const express = require('express');
const mongoose = require('mongoose');
const registartionRouter = express.Router();
const {generatePassword} = require('../../utils/passwordManager');

const User = mongoose.model('users');

registartionRouter.post('/',async(req,res,next) =>{
    const {email, password,firstName,lastName} = req.body;
    if(email && password &&
        firstName && lastName){
        const userData = User({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: await generatePassword(password)
        });
        try {
            const user = await User.create(userData);
            res.send(user);
        }catch (e) {
            console.log(e);
            res.status(400).send("Something went wrong");
        }
    } else {
        res.status(404).send("Incomplete request");
    }

});

module.exports = registartionRouter;