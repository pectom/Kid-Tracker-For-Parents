const express = require('express');
const registartionRouter = express.Router();
const mongoose = require('mongoose');
const {generatePassword} = require('../../utils/passwordManager');

const ChildUser = mongoose.model('child-users');

registartionRouter.post('/',async (req,res,next) =>{
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