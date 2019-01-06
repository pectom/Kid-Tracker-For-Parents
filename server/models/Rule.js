const mongoose = require('mongoose');
const {Schema} = mongoose;

const ChildUser =  mongoose.model("child-users");
const User =  mongoose.model('users');
const {sendNotification} = require("../services/firebase");


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
    },
    notification: {
        type: Boolean,
        default: false
    }
});
ruleSchema.methods.checkRule = async function(){
    try {
        const user = await User.findOne({
            _id: this._user
        });
        const areas = user.areas;
        const index = areas.findIndex(area => String(area._id) === this.areaId);

        if(index !== -1) {
            const area = areas[index];
            const child = await ChildUser.findOne({
                    _id: this.childId,
                    location: {
                        $geoWithin: {
                            $geometry: area.location
                        }
                    }
                }
            );
            //child broke the rule
            this.notification = child ? false : true;

            if(!child){
                sendNotification(user,child,this,area)
            }
        }
        return this.notification;
    }catch (e) {
        console.log(e);
        return null;
    }
};
mongoose.model('rules',ruleSchema);