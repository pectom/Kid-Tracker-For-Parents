const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const ChildUser = mongoose.model('child-users');
const Area = mongoose.model('areas');
const areaRouter = express.Router();
//const validateIcon = require('../middlewares/validateIcon');


areaRouter.post('/',async (req,res,next)=>{
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
    try {
        const user = await User.updateOne({
            _id: parent._id
        },{
            $push: {areas: newArea}
        });
        res.status(201).send(user);
    }catch (e) {
        res.status(400).send();
    }
    }else{
        res.status(400).send("Incomplete request");
    }
});
areaRouter.get('/', async (req,res,next)=> {
    try{
        const children = await ChildUser.find(
            {parentId: req.user._id}
        );
        req.user.areas.forEach(area =>
            area.children = area.children.map(x => children.filter(child => {
                    return String(child._id)===x
                })[0]
            ));
        res.send(req.user.areas);
    }catch(e){
        res.status(400).send(e);
    }

});
areaRouter.put('/:areaId', async (req,res,next) => {
    const {name, iconId, longitude, latitude, radius, children} = req.body;
    const areaId = req.params.areaId;

    if(name && iconId && longitude && latitude && radius && children){
        const areas = req.user.areas;
        const index = areas.findIndex(area => String(area._id) === areaId);
        if(index !== -1){
            const newArea = new Area({
                name,
                coordinates: [latitude,longitude],
                iconId,
                radius,
            });
            newArea.children = children;
            newArea._id = areas[index]._id;
            areas[index] = newArea;
            try{
                const user = await User.updateOne({
                    _id: req.user._id
                },{
                    areas
                });
                res.send(req.user.areas).status(204);
            }catch (e) {
                res.status(400).send(e);

            }
        }else{
            res.status(400).send("Area not found");
        }
    }else{
        res.status(400).send("Invalid params");
    }
});

areaRouter.delete('/:areaId', async(req, res, next) =>{
    const areaId = req.params.areaId;
    const areas = req.user.areas;
    try{
        const index = areas.findIndex(area => String(area._id) === areaId);
        if(index !== -1){
            areas.splice(index,1);
            const user = await User.updateOne({
                _id: req.user._id
            },{
                areas: areas
            });

            const children = await ChildUser.find(
                {parentId: req.user._id}
            );
            req.user.areas.forEach(area =>
                area.children = area.children.map(x => children.filter(child => {
                        return String(child._id)===x
                    })[0]
                ));
            res.send(req.user.areas).status(204);
        }else{
            res.status(400).send("Wrong area id");
        }
    }catch (err) {
        res.status(400).send(err);
    }
});

module.exports = areaRouter;