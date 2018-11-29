const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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
    }
});

userSchema.methods.generateHash = (password) =>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null)
};

userSchema.methods.validPassword = (userpassword,password) => {
    return bcrypt.compareSync(password, userpassword);
};

mongoose.model('users',userSchema);