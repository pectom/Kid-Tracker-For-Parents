const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const ChildUser = mongoose.model('child-users');
const ConnectionCode = mongoose.model('codes');

const childrenRouter = express.Router();

childrenRouter.post('/',async (req,res,next)=>{
    const {name, iconColor,code} = req.body;
    if(name && iconColor && code)
    { //sprawdzanie unikalnosci ikony i koloru
        const parent = req.user;
        //znalezienie kodu w celu pobrania idDziecka
        const codeObject = await ConnectionCode.findOne({
            code
        });
        const childId = codeObject ? codeObject.childId : req.user._id;
        //dodanie id dziecka do rodzica
        const user = await User.updateOne({
            _id: parent._id
        },{
            $push: {children: childId}
        });
        //dodanie informacji z webowki do dziecka
        await ChildUser.updateOne({
            _id: childId
        },{
            connected: true,
            name,
            iconColor,
            parentId: parent._id
        });
        res.status(201).send({"succes":"ok", "message":"Child has been added"});
    }else{
        res.status(400).send("Incomplete request");
    }
});
childrenRouter.get('/',async (req,res,next)=> {
    try{
        const children = await ChildUser.find(
            {
                parentId: req.user._id
            }
        );
        res.send(children);
    }catch (e) {
        res.status(400).send(e);
    }
});
childrenRouter.put('/:childId', async (req,res,next) => {
    const {name, iconColor} = req.body;
    const childId = req.params.childId;
    if(name && iconColor){
        try {
            const child = await ChildUser.updateOne({
                _id: childId
            },{
                name,
                iconColor
            });
            res.send(child).status(204);
        } catch(e){
            res.status(400).send(e);
        }
    }else{
        res.status(400).send("Incomplete request");
    }
});
childrenRouter.delete('/:childId', async(req, res, next) =>{
    try{
        const childId = req.params.childId;
        const children = req.user.children;
        const index = await children.findIndex(id => String(id) === String(childId));
        if(index !== -1){
            children.splice(index,1);
            await User.updateOne({
                _id: req.user._id
            },{
                children
            });

            const child = await ChildUser.findOne({_id: childId});
            child.remove();
            return res.send(children).status(204);
        }else{
            res.status(400).send("Children not found");
        }
    } catch (e) {
        console.log(e);
    }
});
childrenRouter.post('/hack',async (req,res,next)=> {
    try {
        const name = req.body.name;
        const user = new ChildUser({
            connected: true,
            iconColor: "ffffc107",
            parentId: req.user.id,
            location: {
                coordinates: [
                    50.63381152890119,
                    20.30887931585312
                ],
                "type": "Point"
            },
            name
        });
        const childUser = await user.save();
        await User.updateOne({
            _id: req.user.id
        },{
            $push: {children: childUser.id}
        });
        res.status(200).send({"success":"ok"})
    }catch (e) {
        console.log(e);
        res.status(400).send(e.message)
    }
});
module.exports = childrenRouter;