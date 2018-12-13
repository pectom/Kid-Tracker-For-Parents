const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionCodeSchema = new Schema({
   code:{
       type: Number,
       unique: true
   },
   createdAt: {
       type: Date,
       expires: '2m',
       default: Date.now
   },
   childId: {
       type: mongoose.Types.ObjectId, ref: 'child-users'
   }
});
mongoose.model('codes',connectionCodeSchema);