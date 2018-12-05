
module.exports =  async (req,res,next) =>{
    const parent = req.user;
    const index = parent.areas.findIndex(area => {
       return area.iconId === req.body.iconId;
    });
    if(index !== -1){
        return res.status(400).send("Icon must be unique");
    }else{
        next();
    }
};
