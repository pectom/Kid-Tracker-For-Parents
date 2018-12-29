const mongoose = require('mongoose');
const {Schema} = mongoose;

const areaSchema = new Schema({
    name:{
      type: String,
        required: [true,'Name is required']
    },
    iconId:{
        type: String,
        trim: true,
        required: true
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