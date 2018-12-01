// mongo ds119024.mlab.com:19024/kid-tracker-dev -u Admin -p Zachara123
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ChildSchema = require("./Child");

const userSchema = new Schema({
   googleId: {
       type: String,
       index: {
           unique: true,
           sparse: true,
       }
   },
    email :{
        type: String,
        index: {
            unique: true,
            sparse: true,
        },
    },
    password: {
         type: String
    },
    firstName: {
       type:String,
        trim:true
    },
    lastName: {
       type:String,
        trim: true
    },
    type: {
       type: String,
    },
    children: [ChildSchema]

});

userSchema.methods.generateHash = (password) =>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null)
};

userSchema.methods.validPassword = (userpassword,password) => {
    return bcrypt.compareSync(password, userpassword);
};

mongoose.model('users',userSchema);