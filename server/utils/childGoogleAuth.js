const mongoose = require('mongoose');
const ChildUser = mongoose.model('child-users');

module.exports = (accessToken,refreshToken, profile, done) =>{
    ChildUser.findOne({googleId: profile.id})
        .then((existingUser)=>{
            if(existingUser){
                done(null,existingUser);
            }else {
                new ChildUser({googleId: profile.id})
                    .save()
                    .then(user => done(null,user));
            }
        })
};