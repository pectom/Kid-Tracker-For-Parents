const express = require('express');
const mongoose = require('mongoose');
const childrenRouter  = require('./parentRoutes/childrenRoutes');
const areaRouter = require('./parentRoutes/areaRoutes');
const ruleRouter = require('./parentRoutes/ruleRoutes');
const locationRouter = require('./parentRoutes/locationRoutes');

const User = mongoose.model('users');

const parentRouter = express.Router();

parentRouter.use('/children',childrenRouter);
parentRouter.use('/areas',areaRouter);
parentRouter.use('/rules', ruleRouter);
parentRouter.use('/location', locationRouter);

parentRouter.delete('/',async (req,res,next) =>{
   try{
       await User.deleteOne({_id: req.user._id});
       res.send({message: "User has been deleted"}).status(204);
   } catch (e) {
       console.log(e);
       res.status(400).send(e);
   }
});

module.exports = parentRouter;