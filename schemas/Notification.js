var mongoose = require('mongoose');

var notificationSchema = mongoose.Schema({
  id: { type:Number,required:true, unique:true },
  send_user: {type:String, required:true },
  rec_user: { type:String, required:true},
  post_id: { type:String},
  contents: { type:String, required:true},
  createdAt:{ type:Date, default:Date.now},
  status:{ type:String, required:true}
});

module.exports = mongoose.model('Notification', notificationSchema);
/*
DB Schema
NO	컬럼ID		컬럼명		           type		  null		key 
1	id		      알림번호  	         string		n.n	  	p.k
2	send_user	  알림보낸사람id	     string	  n.n
3	rec_user		알림받는사람id	     string		n.n
4	contents		알림내용	           string		n.n
5	createdAt	  알림 생성시각	       Date	  	n.n
6	post_id		  게시물의 object id	string	
7	status		  알림구분	          string		n.n
*/