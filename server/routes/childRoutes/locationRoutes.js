const express = require('express');
const mongoose = require('mongoose');

const ChildUser =  mongoose.model('child-users');
const locationRouter = express.Router();
const Rule = mongoose.model('rules');

locationRouter.post("/",async (req,res,next)=>{
    const {latitude, longitude} = req.body;
    if(latitude && longitude){
        try{
            const child = await ChildUser.updateOne(
                {
                    _id: req.user._id
                },{
                    location: {
                        type: "Point",
                        coordinates: [longitude,latitude]
                    },
                    locationTime: Date.now()
                }
            );

            await checkAllCurrentRulesForChild(req.user.id); //check if child broke some rule

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
    const {locationTime,location} = req.user;
    res.send({
        location,
        locationTime
    });
});

async function checkAllCurrentRulesForChild(childId){
    try {
        const currentRules = await Rule.find({
            childId,
            startDate: {$lte: Date.now()},
            endDate: {$gte: Date.now()}
        });
        currentRules.forEach(async rule => {
            await rule.checkRule();
            await rule.save();
            }
        );
    }catch (e) {
        console.log(e);
        return e;
    }
}
module.exports = locationRouter;