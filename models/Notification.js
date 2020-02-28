var mongoose = require('mongoose');

var notificationSchema = mongoose.Schema({
  send_user: {
    type:String,
    required:true
  },
  rec_user: {
    type:String,
    required:true
  },
  post_id: {
    type:String
  },
  reply_id: {
    type:String
  },
  contents: {
    type:String,
    required:true
  },
  createdAt:{
    type:Date, 
    default:Date.now, 
  },
  readAt: {
    type:Date, 
    default:Date.now, 
  }
});

var Notification = mongoose.model('notification', notificationSchema);
module.exports = Notification;
