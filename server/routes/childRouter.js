const express = require('express');

const locationRouter  = require('./childRoutes/locationRoutes');
const connectionRouter = require('./childRoutes/connectionRoutes');

const childRouter = express.Router();

childRouter.use('/location',locationRouter);
childRouter.use('/code',connectionRouter);

module.exports = childRouter;