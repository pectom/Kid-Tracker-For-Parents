const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../../middlewares/requireLogin');
const requireChildren = require('../../middlewares/requireChildren');

const Rule =  mongoose.model('rules');

const ruleRouter = express.Router();

ruleRouter.post('/', async(req,res,next) =>{
   const {startDate, endDate, startTime, endTime, repetition, areaId, childId} = req.body;

   if(startDate, endDate, startTime, endTime, areaId, childId){
       const start =new Date(startDate  +'T'+ startTime );
       const end =new Date(endDate  +'T'+ endTime);
       const newRule = new Rule({
           startDate: start,
           endDate: end,
           repetition,
           areaId,
           lastResponded: Date.now(),
           childId,
           _user: req.user.id
           });
       try{
           await newRule.save();
           res.status(201).send(newRule)
       }catch (e) {
           console.log(e);
           res.status(400).send('Something went wrong!')
       }
   }else{
       res.status(400).send("Incomplete request");
   }
});
ruleRouter.get("/",async (req,res,next) =>{
    try{
        const rules = await Rule.find({
            _user: req.user.id,
            startDate: {$lte: Date.now()},
            endDate: {$gte: Date.now()}
        });
        res.send(rules);
    }catch (e) {
        console.log(e);
        res.status(404).send(e);
    }
});
ruleRouter.get("/:childId",async (req,res,next) =>{
    const childId = req.params.childId;
    try{
        const rules = await Rule.find({
            _user: req.user.id,
            childId: childId
        });
        res.send(rules);
    }catch (e) {
        console.log(e);
        res.status(404).send(e);
    }
});
ruleRouter.delete("/:ruleId",async (req,res,next) =>{
    const ruleId = req.params.ruleId;
    try{
        const rules = await Rule.deleteOne({
            _id: ruleId
        });
        res.status(204).send(rules);
    }catch (e) {
        console.log(e);
        res.status(404).send(e);
    }
});
ruleRouter.put("/:ruleId",async (req,res,next) =>{
    const {startDate, endDate, startTime, endTime, repetition, areaId, childId} = req.body;

    if(startDate, endDate, startTime, endTime, areaId, childId){
        const ruleId = req.params.ruleId;
        const start =new Date(startDate  +'T'+ startTime );
        const end =new Date(endDate  +'T'+ endTime);
        try{
            await Rule.updateOne({_id: ruleId},{
                startDate: start,
                endDate: end,
                repetition,
                areaId,
                lastResponded: Date.now(),
                childId,
            });
            res.status(201).send();
        }catch (e) {
            console.log(e);
            res.status(400).send('Something went wrong!')
        }
    }else{
        res.status(400).send("Incomplete request");
    }
});
module.exports = ruleRouter;