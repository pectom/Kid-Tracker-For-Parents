const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (accessToken,refreshToken, profile, done) =>{
    console.log("\"accesToken\": " + accessToken);
    console.log("\"profile\": " + JSON.stringify(profile));
    User.findOne({googleId: profile.id})
        .then((existingUser)=>{
            if(existingUser){
                done(null,existingUser);
            }else {
                new User({googleId: profile.id})
                    .save()
                    .then(user => done(null,user));
            }
        })
};