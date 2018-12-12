const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childUserSchema = new Schema({
    googleId: {
        type: String,
        unique: true
    },
    parentId: {type: Schema.Types.ObjectId, ref: 'User'},
    childrenId: String,
    connected: {
        type: Boolean,
        default: false
    },
    code: {
        type: String,
        unique: true,
        trim: true
    },
    latitude:{
        type: Number,
    },
    longitude:{
        type: Number,
    }
});

mongoose.model('child-users',childUserSchema);