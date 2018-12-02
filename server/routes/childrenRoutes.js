const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');
const Child = mongoose.model('children');

const childrenRouter = express.Router();


childrenRouter.post('/api/children',requireLogin,async (req,res,next)=>{
    const {name, email, iconColor} = req.body;
    if(name && email && iconColor)
    { //sprawdzanie unikalnosci ikony i koloru
        const parent = req.user;
        const newChildren = new Child({
            name,
            email,
            iconColor,
        });

        const user = await User.updateOne({
            _id: parent._id
        },{
            $push: {children: newChildren}
        });
        res.status(201).send(user);
    }else{
        res.status(400).send();
    }
});
childrenRouter.get('/api/children',requireLogin,(req,res,next)=> {
    res.send(req.user.children);
});
childrenRouter.put('/api/children/:childId',requireLogin, async (req,res,next) => {
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
childrenRouter.delete('/api/children/:childId',requireLogin, async(req, res, next) =>{
    const childId = req.params.childId;
    console.log(childId);
    const children = req.user.children;
    const index = children.findIndex(child => String(child._id) === childId);
    if(index !== -1){
        children.splice(index,1);
        const user = await User.updateOne({
            _id: req.user._id
        },{
            children
        });
        res.status(204).send(user);
    }else{
        res.status(400).send();
    }
});
module.exports = childrenRouter;