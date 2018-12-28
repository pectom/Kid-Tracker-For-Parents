const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const childUserSchema = new Schema({
    googleId: {
        type: String,
        index: {
            unique: true,
            sparse: true
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

    parentId: {type: Schema.Types.ObjectId, ref: 'User'},
    childrenId: String,

    name: {
        String
    },
    connected: {
        type: Boolean,
        default: false
    },
    code: {
        type: String,
        index: {
            unique: true,
            sparse: true,
        },
        trim: true
    },
    locationTime:{
      type: Date
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    iconColor: {
        type: String,
        trim: true,
    },
    type:{
        type: String,
        default: "CHILD"
    }
});

mongoose.model('child-users',childUserSchema);