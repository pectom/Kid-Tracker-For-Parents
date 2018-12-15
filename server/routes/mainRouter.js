const express = require('express');
const mainRouter = express.Router();

const registrationRoutesChild = require('./childRoutes/registrationRoutes');
const registrationRoutesParent = require('./parentRoutes/registrationRoutes');

const authRouterChild = require('./childRoutes/authRoutes');
const authRouterParent = require('./parentRoutes/authRoutes');

const requireParent = require('../middlewares/requireParent');
const requireChild = require('../middlewares/requireChildren');

const parentRouter = require('./parentRouter');
const childRouter = require('./childRouter');

mainRouter.use('/registration/parent',registrationRoutesParent);
mainRouter.use('/registration/child',registrationRoutesChild);

mainRouter.use('/auth/child',authRouterChild);
mainRouter.use('/auth/parent',authRouterParent);

mainRouter.use('/api/child',requireChild,childRouter);
mainRouter.use('/api/parent',requireParent,parentRouter);

module.exports = mainRouter;