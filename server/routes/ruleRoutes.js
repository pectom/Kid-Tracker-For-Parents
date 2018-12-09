const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');
const Area =  mongoose.model('areas');
const Child = mongoose.model('children');
const Rule =  mongoose.model('rules');

const ruleRouter = express.Router();

ruleRouter.post('/api/rules',requireLogin, async(req,res,next) =>{
   const {startDate, endDate, startTime, endTime, repetition, areaId, children} = req.body;

   if(startDate, endDate, startTime, endTime, areaId, children){
       const start =new Date(startDate  +'T'+ startTime );
       const end =new Date(endDate  +'T'+ endTime);
       const newRule = new Rule({
           startDate: start,
           endDate: end,
           repetition,
           areaId,
           lastResponded: Date.now(),
           children,
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
ruleRouter.get("/api/rules",async (req,res,next) =>{
    try{
        const rules = await Rule.find({
            _user: req.user.id,
            startDate: {$lte: Date.now()},
            endDate: {$gte: Date.now()}
        });
        const requiredAreasId = rules.map(rule => rule.areaId);
        const requiredAreas = req.user.areas.filter(area =>
            requiredAreasId.findIndex(area =>String(area._id) === String(area._id)) !== -1
        );
        const children = await req.user.children;
      /*     rules.forEach(rule => {
               rule.children = rule.children.map(x => children.filter(child => {
                   return String(child._id)===x;
               }));
               rule.areaId = areas.filter(area => {
                   return String(area._id) === rule.areaId
               });
           });*/
      response = new Object();
      response.rules = rules;
      response.areas = requiredAreas;
      response.children = children;
      console.log(rules);
        res.send(response);
    }catch (e) {
        console.log(e);
        res.status(404).send(e);
    }
});
ruleRouter.get("/api/rules/:childId",async (req,res,next) =>{
    const childId = req.params.childId;
    try{
        const rules = await Rule.find({
            _user: req.user.id,
            startDate: {$lte: Date.now()},
            endDate: {$gte: Date.now()},
            children: {$all: [childId]}
        });
        const requiredAreasId = rules.map(rule => rule.areaId);
        const requiredAreas = req.user.areas.filter(area =>
            requiredAreasId.findIndex(area =>String(area._id) === String(area._id)) !== -1
        );
        const  children = await req.user.children;
        const childrenIndex = children.findIndex(child => String(child._id) === childId);
        /*     rules.forEach(rule => {
                 rule.children = rule.children.map(x => children.filter(child => {
                     return String(child._id)===x;
                 }));
                 rule.areaId = areas.filter(area => {
                     return String(area._id) === rule.areaId
                 });
             });*/
        response = new Object();
        response.rules = rules;
        response.areas = requiredAreas;
        response.child =  childrenIndex !== -1  ? children[childrenIndex] : "";
        res.send(response);
    }catch (e) {
        console.log(e);
        res.status(404).send(e);
    }
});
ruleRouter.delete("/api/rules/:ruleId",async (req,res,next) =>{
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
ruleRouter.put("/api/rules/:ruleId",async (req,res,next) =>{
    const {startDate, endDate, startTime, endTime, repetition, areaId, children} = req.body;

    if(startDate, endDate, startTime, endTime, areaId, children){
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
                children,
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