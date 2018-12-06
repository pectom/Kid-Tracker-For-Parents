const mongoose = require('mongoose');
const {Schema} = mongoose;

const ruleSchema = new Schema({
    lastResponded: {
      type: Date,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    repetition: {
        type: String,
        enum: ['DAILY', 'WEEKLY','MONTHLY','YEARLY', 'WORKDAYS',
            'WEEKENDS'
        ]
    },
    areaId: {
        type: String,
        required: true
    },
    children:{
        type: [String],
        required: true
    },
    _user: {type: Schema.Types.ObjectId, ref: 'User'},

});

mongoose.model('rules',ruleSchema);