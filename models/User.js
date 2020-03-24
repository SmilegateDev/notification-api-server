var mongoose = require('mongoose');

var notificationSchema = mongoose.Schema({
  count : {type:Int16Array, required:true},
  rec_user:{type:mongoose.Schema.Types.ObjectId, ref:'notification', required:true}
});

var Notification = mongoose.model('user', userSchema);
module.exports = User;



