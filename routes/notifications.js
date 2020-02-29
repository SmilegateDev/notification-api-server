var express  = require('express');
var router = express.Router();
var Notification = require('../models/Notification');
var nJwt = require('njwt');
var tokenValues;

// Index
/*
router.get('/myNoti',
  function(req, res, next){
    var query = {};
    tokenValues=nJwt.verify(req.headers.authorization,process.env.JWT_SECRET, 'HS256');
    if(req.query.name) query.name = {$regex:req.query.name, $options:'i'};

    Notification.find(query)
      .sort({id: 1})
      .exec(function(err, notifications){
        if(err) {
          res.status(500);
          res.json({success:false, message:err});
        }
        else {
          res.json({success:true, data:notifications.contents});
        }
      });
  }
);
*/

// Show
router.get('/myNoti',
  function(req, res, next){
    tokenValues=nJwt.verify(req.headers.authorization,process.env.JWT_SECRET, 'HS256');
    Notification.find({rec_user:tokenValues.body.uid})
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
    newNotification.contents = req.body.send_user+"님이 회원님의 게시물에 댓글을 남기셨습니다 : "+req.body.replyContents;
    newNotification.save(function(err, notification){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        res.json({success:true, data:notification});
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
    newNotification.contents = req.body.send_user+"님이 회원님을 팔로우 하기 시작했습니다";
    newNotification.save(function(err, notification){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        res.json({success:true, data:notification});
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
    newNotification.contents = req.body.send_user+"님이 회원님의 게시물을 좋아합니다";
    newNotification.save(function(err, notification){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        res.json({success:true, data:notification});
      }
    });
  }
);

router.post('/replyback',
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
    newNotification.save(function(err, notification){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        res.json({success:true, data:notification});
      }
    });
  }
);

router.post('/unfollow',
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
    newNotification.save(function(err, notification){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        res.json({success:true, data:notification});
      }
    });
  }
);

router.post('/unlike',
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
    newNotification.save(function(err, notification){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        res.json({success:true, data:notification});
      }
    });
  }
);

// Update
/*
router.put('/:id',
  function(req, res, next){
    Notification.findOneAndUpdate({id:req.params.id}, req.body)
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
*/

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
          res.json({success:true});
        }
      });
  }
);

module.exports = router;
