const express = require('express');
const mongoose = require('mongoose');

const ChildUser =  mongoose.model('child-users');
const locationRouter = express.Router();

locationRouter.get("/:childId",async (req,res,next)=>{
    const childId = req.params.childId;
    try{
        const child = await ChildUser.findOne({
            _id: childId
        });
        const {latitude,longitude,locationTime} = child;
        res.send({
            latitude,
            longitude,
            locationTime
        })
    }catch (e) {
        res.status(404).send(e);
    }
});

module.exports = locationRouter;