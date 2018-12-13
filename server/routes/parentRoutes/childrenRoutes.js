const express = require('express');
const mongoose = require('mongoose');

const requireLogin = require('../../middlewares/requireLogin');
const requireChildren = require('../../middlewares/requireChildren');
const requireParent = require('../../middlewares/requireParent');

const User = mongoose.model('users');
const Child = mongoose.model('children');
const ChildUser = mongoose.model('child-users');
const ConnectionCode = mongoose.model('codes');

const childrenRouter = express.Router();


childrenRouter.post('/api/children',requireParent,async (req,res,next)=>{
    const {name, iconColor,code} = req.body;
    if(name && iconColor && code)
    { //sprawdzanie unikalnosci ikony i koloru
        const parent = req.user;
        //znalezienie kodu w celu pobrania idDziecka
        const codeObject = await ConnectionCode.findOne({
            code
        });
        const childId = codeObject ? codeObject.childId : req.user._id;
//Deprecated
        const newChildren = new Child({
            name,
            iconColor,
        });
        //dodanie id dziecka do rodzica
        const user = await User.updateOne({
            _id: parent._id
        },{
            $push: {children: newChildren}, //deprecated
            $push: {child: childId}
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
        res.status(201).send(user);
    }else{
        res.status(400).send("Incomplete request");
    }
});
childrenRouter.get('/api/children',requireParent,(req,res,next)=> {
    res.send(req.user.children);
});
childrenRouter.put('/api/children/:childId',requireParent, async (req,res,next) => {
   const {name, iconColor} = req.body;
   const childId = req.params.childId;
   if(name && iconColor){
       const children = req.user.children;
       const index = children.findIndex(child => String(child._id) === childId);
       if(index !== -1){
           children[index].name = name;
           children[index].iconColor = iconColor;
           const user = await User.updateOne({
               _id: req.user._id
           },{
               children
           });
           res.status(204).send(user);
       }else{
           res.status(400).send();
       }
   }else{
       res.status(400).send();
   }
});
childrenRouter.delete('/api/children/:childId',requireChildren, async(req, res, next) =>{
    try{
        const childId = req.params.childId;
        const children = req.user.children;
        const index = await children.findIndex(child => String(child._id) === childId);
        if(index !== -1){
            children.splice(index,1);
            await User.updateOne({
                _id: req.user._id
            },{
                children
            });
            return res.send(children).status(204);
        }else{
            res.status(400).send("Children not found");
        }
    } catch (e) {
        console.log(e);
    }
});
module.exports = childrenRouter;