const mongoose = require('mongoose');
const {Schema} = mongoose;

const User =  mongoose.model('users');
const {sendBreakRuleNotification,sendBackToAreaNotification} = require("../services/firebase");


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
    isBreakRuleNotificationSent: {
        type: Boolean,
        default: false
    },
});
ruleSchema.pre('remove',{document:true}, function () {
    console.log(this);
});
ruleSchema.methods.checkRule = async function(name){
    const ChildUser =  mongoose.model("child-users");
    try {
        const user = await User.findOne({
            _id: this._user
        });
        const areas = user.areas;
        const index = areas.findIndex(area => String(area._id) === this.areaId);
        if(index !== -1) {
            const area = areas[index];
            //return undefined if child broke rule
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
            if(!child && !this.isBreakRuleNotificationSent){
                sendBreakRuleNotification(user,name,this,area);
                this.isBreakRuleNotificationSent = true;
            }
            if(child && this.isBreakRuleNotificationSent){
                sendBackToAreaNotification(user,name,this,area);
                this.isBreakRuleNotificationSent = false;
            }
        }
    }catch (e) {
        console.log(e);
        return null;
    }
};
mongoose.model('rules',ruleSchema);