module.exports = (req,res,next) =>{
    if(req.user.type !== "CHILD"){
        return res.status(401).send({
            error: 'Permission error. You must be a child!'
        });
    }
    next();
};