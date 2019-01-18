const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('users');
const Rule = mongoose.model('rules');


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
        type: String
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
        },
        coordinates: {
            type: [Number],
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

childUserSchema.post('remove', { document: true},async function () {
    try{
        const parent = await User.findOne({_id: this.parentId});

        const areas = parent.areas;
        //delete areas with only this child
        const areas2 = areas.filter(area =>{
            return !(area.children.length === 1 && area.children.includes(this.id))
        });
        //delete child from area children array
        areas2.forEach(area => {
            let index = area.children.indexOf(this.id);
            if(index !== -1){
                area.children.splice(index,1);
            }
        });
        await User.findOneAndUpdate({
            _id: this.parentId
        },{
            areas: areas2
        });
        //delete all children rules
        await Rule.remove({childrenId: this.id});
    }catch (e) {
        console.log(e)
    }
});

mongoose.model('child-users',childUserSchema);