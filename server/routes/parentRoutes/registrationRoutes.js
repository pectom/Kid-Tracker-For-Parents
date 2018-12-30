const express = require('express');
const mongoose = require('mongoose');
const registartionRouter = express.Router();
const {generatePassword} = require('../../utils/passwordManager');
const requireParent = require('../../middlewares/requireParent');

const User = mongoose.model('users');

registartionRouter.post('/',async(req,res) =>{
    const {email, password,firstName,lastName,firebaseToken} = req.body;
    if(email && password &&
        firstName && lastName){
        const userData = User({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: await generatePassword(password),
            firebaseToken: firebaseToken ? firebaseToken : ""
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
registartionRouter.post('/token',requireParent,async (req,res) =>{
    const {firebaseToken} =req.body;
    if(firebaseToken){
        try {
            User.updateOne({
                _id: req.user._id
            },{
                firebaseToken
            });
            res.status(400).send({
                success: "ok"
            });
        }catch (e) {
            console.log(e);
            res.status(400).send(e)
        }
    }else{
        res.status(404).send("Incomplete request")
    }
});
module.exports = registartionRouter;