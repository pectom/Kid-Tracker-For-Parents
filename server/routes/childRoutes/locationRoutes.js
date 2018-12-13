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
                    longitude
                }
            );
            res.status(204).send(child);
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
        const {latitude,longitude} = child;
        res.send({
            latitude,
            longitude
        })
    }catch (e) {
        res.status(404).send(e);
    }
});
locationRouter.get("/api/location",requireChildren,async (req,res,next)=>{
    const {latitude,longitude} = req.user;
    if(latitude && longitude) //mamy do czynienie z uzytkownikiem dziecko
        res.send({
            latitude,
            longitude
        });
    else {
        res.status(400).send("Wrong user");
    }
});

module.exports = locationRouter;