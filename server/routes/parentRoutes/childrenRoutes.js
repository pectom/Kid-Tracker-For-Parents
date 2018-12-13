const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const Child = mongoose.model('children');
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
        const child = req.user.child;
        const index = await child.findIndex(id => String(id) === String(childId));
        if(index !== -1){
            child.splice(index,1);
            await User.updateOne({
                _id: req.user._id
            },{
                child
            });
            await ChildUser.find({_id: childId})
                .remove()
                .exec();
            return res.send(child).status(204);
        }else{
            res.status(400).send("Children not found");
        }
    } catch (e) {
        console.log(e);
    }
});
module.exports = childrenRouter;