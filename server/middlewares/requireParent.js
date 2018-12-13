module.exports = (req,res,next) =>{
    if(req.user.type !== "PARENT"){
        return res.status(401).send({
            error: 'Permission error. You must be a parent!'
        });
    }
    next();
};