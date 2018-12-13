const express = require('express');
const mongoose = require('mongoose');

const ChildUser =  mongoose.model('child-users');
const locationRouter = express.Router();

locationRouter.post("/",async (req,res,next)=>{
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
locationRouter.get("/",async (req,res,next)=>{
    const {latitude,longitude,locationTime} = req.user;
        res.send({
            latitude,
            longitude,
            locationTime
        });
});

module.exports = locationRouter;