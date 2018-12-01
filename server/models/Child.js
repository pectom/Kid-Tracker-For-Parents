const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childSchema =  new Schema({
    name: {
      type: String
    },
    location_X:{
        type: String,
    },
    location_Y:{
        type: String,
    },
    dateSent: Date,
    iconLetter: {
        type: String,
        trim: true,
    },
    iconColor: {
        type: String,
        trim: true,
    },
    isConnected:{
      type: Boolean,
      default: false
    }
});

mongoose.model('children', childSchema);