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
        console.log(e);
        req.status(404).send({"success": "ok", "message" : e.message})
    }
});
locationRouter.delete("/token",async (req,res) =>{
    try {
        req.user.firebaseToken =undefined;
        console.log(req.user);
        await req.user.save();
        res.send({"success": "ok", "message": "Token has been deleted"}).status(204);
    }catch (e) {
        console.log(e);
        res.send({"success": "ok", "message" : e.message}).status(404)
    }
});
module.exports = locationRouter;