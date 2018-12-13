const express = require('express');
const connectionRouter = express.Router();

const mongoose = require('mongoose');
const ConnectionCode = mongoose.model('codes');

//dodac require children
connectionRouter.get('/',async (req,res,next) =>{
    let added = false;
    let codeObject;
    while(!added){
        let code = Math.floor(Math.random() * 100000) + 100000;
        try{
             codeObject = await ConnectionCode.create({
                childId: req.user._id,
                code
            });
             added = true;
        }catch (e) {
            console.log(e);
            if(e.code!==11000){
                res.status(400).send("Something went wrong");
            }
        }
    }
    res.send(codeObject);
});
connectionRouter.get('/all',async (req,res,next) =>{
    try{
        const codes = await ConnectionCode.find();
        res.send(codes);
    }catch (e) {
        res.status(400).send(e);
    }
});

module.exports = connectionRouter;