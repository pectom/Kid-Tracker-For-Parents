const express = require('express');

const childrenRouter  = require('./parentRoutes/childrenRoutes');
const areaRouter = require('./parentRoutes/areaRoutes');
const ruleRouter = require('./parentRoutes/ruleRoutes');

const parentRouter = express.Router();

parentRouter.use('/children',childrenRouter);
parentRouter.use('/areas',areaRouter);
parentRouter.use('/rules', ruleRouter);

module.exports = parentRouter;