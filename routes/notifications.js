var express  = require('express');
var router = express.Router();
var Notification = require('../models/Notification');
var nJwt = require('njwt');
var tokenValues;

// Index
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
          res.json({success:true, data:notifications});
        }
      });
  }
);

// Show
/*
router.get('/:id',
  function(req, res, next){
    Notification.findOne({id:req.params.id})
      .exec(function(err, notification){
        if(err) {
          res.status(500);
          res.json({success:false, message:err});
        }
        else if(!notification){
          res.json({success:false, message:'notification not found'});
        }
        else {
          res.json({success:true, data:notification});
        }
      });
  }
);
*/

// Create
router.post('/newNoti',
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
    tokenValues=nJwt.verify(req.headers.authorization,process.env.JWT_SECRET, 'HS256');
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
