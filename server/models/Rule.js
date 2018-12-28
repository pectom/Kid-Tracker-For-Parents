const mongoose = require('mongoose');
const {Schema} = mongoose;
const ChildUsers =  require('./ChildUser');
const Areas =  require('./Area');


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
        enum: ['NONE','DAILY', 'WEEKLY','MONTHLY','YEARLY', 'WORKDAYS',
            'WEEKENDS'
        ]
    },
    areaId: {
        type: String,
        required: true
    },
    childId:{
        type: String,
        required: true
    },
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    active: {
        type: Boolean,
        default: true
    }
});
ruleSchema.methods.checkRule = function(){
    try {
        const area = Areas.findOne(this.areaId);
        const child = ChildUsers.findOne({
                _id: this.childId,
                location: {
                    $geoWithin:{
                        $geometry: area.location
                    }
                }
            }
    );
        return child;
    }catch (e) {
        console.log(e);
    }
};
mongoose.model('rules',ruleSchema);