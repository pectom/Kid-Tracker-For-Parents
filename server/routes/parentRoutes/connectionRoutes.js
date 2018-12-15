const express = require('express');
const connectionRouter = express.Router();

const mongoose = require('mongoose');
const ConnectionCode = mongoose.model('codes');

connectionRouter.get('/:codeValue',async (req,res,next) =>{
    const {codeValue} = req.params;
    try{
        const code = await ConnectionCode.findOne({
            code: codeValue
        });
        res.send(code);
    }catch (e) {
        res.status(400).send(e);
    }
});
module.exports = connectionRouter;