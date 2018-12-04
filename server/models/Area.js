const mongoose = require('mongoose');
const {Schema} = mongoose;

const areaSchema = new Schema({
    name:{
      type: String
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
    children:{
      type: [{type: Schema.Types.ObjectId, ref:"Children"}]
    }
});

mongoose.model('areas',areaSchema);