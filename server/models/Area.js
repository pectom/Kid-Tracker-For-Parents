const mongoose = require('mongoose');
const {Schema} = mongoose;

const areaSchema = new Schema({
    name:{
      type: String,
        required: [true,'Name is required']
    },
    coordinates: {
        type: [Number],
        required: true
    },
    iconId:{
        type: String,
        trim: true,
        required: true
    },
    radius: {
      type: Number
    },
    location: {
        type: {
            type: String,
            enum: ['Polygon'],
            required: true
        },
        coordinates: {
            type: [[[Number]]],
            required: true
        }
    },
    children: [String]
});

mongoose.model('areas',areaSchema);