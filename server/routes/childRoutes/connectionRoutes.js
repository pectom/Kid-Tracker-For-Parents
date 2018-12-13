const express = require('express');
const requireLogin = require('../../middlewares/requireLogin');
const connectionRouter = express.Router();
const requireChildren = require('../../middlewares/requireChildren');
const requireParent = require('../../middlewares/requireParent');

const mongoose = require('mongoose');
const ChildUser = mongoose.model('child-users');
const ConnectionCode = mongoose.model('codes');

//dodac require children
connectionRouter.get('/api/generate_code',requireChildren,async (req,res,next) =>{
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
connectionRouter.get('/api/codes',requireLogin,async (req,res,next) =>{
    try{
        const codes = await ConnectionCode.find();
        res.send(codes);
    }catch (e) {
        res.status(400).send(e);
    }
});
connectionRouter.get('/api/code/:codeValue',requireLogin,async (req,res,next) =>{
    const {codeValue} = req.params;
    try{
        const code = await ConnectionCode.findOne({
            code: codeValue
        });
        res.send(code);
    }catch (e) {
        res.status(400).send(e);
    }
});

module.exports = connectionRouter;