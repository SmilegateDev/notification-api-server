var express  = require('express');
//var WebSocketServer = require('ws').Server
//  , wss = new WebSocketServer({ port: 9090 });
//var io = require('socket.io').listen(80);
var router = express.Router();
var Notification = require('../schemas/Notification');
var {user} = require('../models')
var nJwt = require('njwt');
var client = require('../cache_redis');
var io = require('../socket');
require('dotenv').config();
var tokenValues;
var status;
var count;

// Show
router.get('/',
  function(req, res, next){
    tokenValues=nJwt.verify(req.headers.authorization,process.env.JWT_SECRET, 'HS256');
    user.findOne({
      attributes: ['noticeCount'],
      where: {
        id:tokenValues.body.id // .uid -> .id 로 변경; get 안되는 버그 수정
      }
    })
    .then(result => {
      if(result != null){
        console.log(JSON.stringify(result));
        res.json(result);
      }
    })
    .catch(err=>{
      console.log(err); 
      res.json({
        code:500,
        message:"오류가 발생하였습니다."
      });
     });

  }
);

// Show
router.get('/myNoti',
  function(req, res, next){
    tokenValues=nJwt.verify(req.headers.authorization,process.env.JWT_SECRET, 'HS256');
    Notification.find({rec_user:tokenValues.body.id}) // .uid -> .id 로 변경; get 안되는 버그 수정
      .sort('-createdAt') 
      .exec(function(err, notifications){
        if(err) {
          res.status(500);
          res.json({success:false, message:err});
        }
        else if(!notifications){
          res.json({success:false, message:'notifications not found'});
        }
        else {
          res.json({success:true, data:notifications});
        }
      });
  }
);


// Create
router.post('/reply',
  function(req, res, next){
    Notification.findOne({}) //내림차순으로 알림 index 를 정렬 후, 가장 앞에 있는 최신 알림 한개를 가져온다
      .sort({id: -1}) 
      .exec(function(err, notification){
        if(err) {
          res.status(500);
          return res.json({success:false, message:err});
        }
        else {
          res.locals.lastId = notification?notification.id:0; // 가장 큰 알림 index 번호를 저장
          next();
        }
      });
  },
  function(req, res, next){
    var newNotification = new Notification(req.body); // 요청으로 들어온 데이터 입력
    newNotification.status = "reply";
    newNotification.id = res.locals.lastId + 1; // 알림 index 업데이트
    newNotification.contents = req.body.send_user+"님이 회원님의 게시물에 댓글을 남기셨습니다 : "+req.body.replyContents;
    newNotification.save(function(err, notification){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
       // wss.clients.forEach(function each(client) {
       //   client.send("noti updated");
       //});

       //io.sockets.on('connection', function(socket) {
       // socket.on("reply", function(msg) {
        user.increment('noticeCount',
        {
          where: {
            id:req.body.rec_user
          }
        })
        .then(result =>{
          if(result != null){
            count = result
          }
        });
        // Fetch the socket id from Redis
        client.get(newNotification.rec_user, function(err, socketId) {
            if (err) throw err;
            //io.sockets.socket(socketId).emit('reply'); => 1.0 이전버전 구버전 함수로 버그 발생
            io.to(socketId).emit('reply',{noticeCount:count});
        });
            
        //  });
        
        //});
        res.json({success:true});
      }
    });
  } 
);

router.post('/follow',
  function(req, res, next){
    Notification.findOne({})
      .sort({id: -1})
      .exec(function(err, notification){
        if(err) {
          res.status(500);
          return res.json({success:false, message:err});
        }
        else {
          res.locals.lastId = notification?notification.id:0;
          next();
        }
      });
  },
  function(req, res, next){
    var newNotification = new Notification(req.body);
    newNotification.id = res.locals.lastId + 1;
    newNotification.status = "follow";
    newNotification.contents = req.body.send_user+"님이 회원님을 팔로우 하기 시작했습니다";
    newNotification.save(function(err, notification){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        //wss.clients.forEach(function each(client) {
        //  client.send("noti updated");
        //});
        user.increment('noticeCount',
        {
          where: {
            id:req.body.rec_user
          }
        })
        .then(result =>{
          if(result != null){
            count = result
          }
        });

        client.get(newNotification.rec_user, function(err, socketId) {
          if (err) throw err;
          io.to(socketId).emit('follow',{noticeCount:count});
        });
        res.json({success:true});
      }
    });
  }
);

router.post('/like',
  function(req, res, next){
    Notification.findOne({})
      .sort({id: -1})
      .exec(function(err, notification){
        if(err) {
          res.status(500);
          return res.json({success:false, message:err});
        }
        else {
          res.locals.lastId = notification?notification.id:0;
          next();
        }
      });
  },
  function(req, res, next){
    var newNotification = new Notification(req.body);
    newNotification.id = res.locals.lastId + 1;
    newNotification.status = "like";
    newNotification.contents = req.body.send_user+"님이 회원님의 게시물을 좋아합니다";
    newNotification.save(function(err, notification){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        //wss.clients.forEach(function each(client) {
        //  client.send("noti updated");
        //});
        user.increment('noticeCount',
        {
          where: {
            id:req.body.rec_user
          }
        })
        .then(result =>{
          if(result != null){
            count = result
          }
        });

        client.get(newNotification.rec_user, function(err, socketId) {
          if (err) throw err;
          io.to(socketId).emit('like',{noticeCount:count});
        });
        res.json({success:true});
      }
    });
  }
);

router.delete('/replyBack',
  function(req, res, next){
    status = req.body.status;
    var status_cts = req.body.send_user+"님이 회원님의 게시물에 댓글을 남기셨습니다 : "+req.body.replyContents;
    Notification.findOneAndRemove({contents:status_cts, status:status})
      .exec(function(err, notification){
        if(err) {
          res.status(500);
          res.json({success:false, message:err});
        }
        else if(!notification){
          res.json({success:false, message:'notification not found'});
        }
        else {
          res.json({success:true});
        }
      });
  }
);

router.delete('/unfollow',
  function(req, res, next){
    status = req.body.status;
    Notification.findOneAndRemove({status:status, send_user:req.body.send_user, rec_user:req.body.rec_user})
      .exec(function(err, notification){
        if(err) {
          res.status(500);
          res.json({success:false, message:err});
        }
        else if(!notification){
          res.json({success:false, message:'notification not found'});
        }
        else {
          res.json({success:true});
        }
      });
  }
);

router.delete('/unlike',
  function(req, res, next){
    status = req.body.status;
    Notification.findOneAndRemove({status:status, send_user:req.body.send_user, rec_user:req.body.rec_user, post_id:req.body.post_id})
      .exec(function(err, notification){
        if(err) {
          res.status(500);
          res.json({success:false, message:err});
        }
        else if(!notification){
          res.json({success:false, message:'notification not found'});
        }
        else {
          res.json({success:true});
        }
      });
  }
);

// Destroy 
router.delete('/delNoti/:id',
  function(req, res, next){
    Notification.findOneAndRemove({id:req.params.id})
      .exec(function(err, notification){
        if(err) {
          res.status(500);
          res.json({success:false, message:err});
        }
        else if(!notification){
          res.json({success:false, message:'notification not found'});
        }
        else {
          user.decrement('noticeCount',
          {
            where: {
              id:req.params.id
            }
          })
          .then(result =>{
            if(result != null){
              count = result
            }
          });
          
          res.json({success:true});
        }
      });
  }
);

module.exports = router;
