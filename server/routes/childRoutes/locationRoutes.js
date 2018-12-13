const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../../middlewares/requireLogin');
const requireChildren = require('../../middlewares/requireChildren');
const requireParent = require('../../middlewares/requireParent');
const ChildUser =  mongoose.model('child-users');
const locationRouter = express.Router();

locationRouter.post("/api/location",requireChildren,async (req,res,next)=>{
    const {latitude, longitude} = req.body;
    if(latitude && longitude){
        try{
            const child = await ChildUser.updateOne(
                {
                    _id: req.user._id
                },{
                    latitude,
                    longitude,
                    locationTime: Date.now()
                }
            );
            res.send(child).status(204);
        }catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
    }else{
        res.status(400).send("Incomplete request");
    }
});
locationRouter.get("/api/location/:childId",requireParent,async (req,res,next)=>{
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
locationRouter.get("/api/location",requireChildren,async (req,res,next)=>{
    const {latitude,longitude,locationTime} = req.user;
        res.send({
            latitude,
            longitude,
            locationTime
        });
});

module.exports = locationRouter;