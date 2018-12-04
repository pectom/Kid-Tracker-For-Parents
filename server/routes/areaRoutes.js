const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');
const Child = mongoose.model('children');
const Area = mongoose.model('areas');
const areaRouter = express.Router();
//const validateIcon = require('../middlewares/validateIcon');


areaRouter.post('/api/areas',requireLogin,async (req,res,next)=>{
    const {name, iconId, longitude, latitude, radius, children} = req.body;
    if(name && iconId && longitude && latitude && radius && children)
    {
        const parent = req.user;
        const newArea = new Area({
            name,
            coordinates: [latitude,longitude],
            iconId,
            radius,
            children
        });

        const user = await User.updateOne({
            _id: parent._id
        },{
            $push: {areas: newArea}
        });
        res.status(201).send(user);
    }else{
        res.status(400).send("Incomplete request");
    }
});
areaRouter.get('/api/areas',requireLogin,(req,res,next)=> {
    res.send(req.user.areas);
});
areaRouter.delete('/api/areas/:areaId',requireLogin, async(req, res, next) =>{
    const areaId = req.params.areaId;
    const areas = req.user.areas;
    const index = areas.findIndex(area => String(area._id) === areaId);
    if(index !== -1){
        areas.splice(index,1);
        const user = await User.updateOne({
            _id: req.user._id
        },{
            areas: areas
        });
        res.status(204).send(user);
    }else{
        res.status(400).send("Wrong area id");
    }
});
module.exports = areaRouter;