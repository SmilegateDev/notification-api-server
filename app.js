var express = require('express');
var mongoose = require('mongoose');
var { sequelize } = require('./models/user.js');
var {sequelize} = require('./models');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var logger = require('morgan');
var app = express();
app.io = require('socket.io')();
var client = require('./cache_redis');


require('dotenv').config();

// DB setting
sequelize.sync();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/Post');
var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});

// API
app.use('/noti', require('./routes/notifications'));
/*
app.io.on('connection',function(socket){
  console.log('a user');
  socket.on('init',function(data){
    console.log(data.name);
    socket.emit('welcome',"TEST");
  });
})
*/
app.io.on('connection', function(socket) {
  console.log('a user connected');
  
	socket.emit('server connection', { server: 'socket on' });

  socket.on('client connection', function (data) {  
    console.log(data);
  });

  socket.on('client log on', function(data) {
      client.set(data.userId, socket.id, function(err) {
      if (err) throw err;
        console.log("socket.id on redis complete with socketid : " + socket.id);
      });
    });
  
  socket.on('disconnect', function() {
    client.del(socket.id, function(err, response) {
      if (response == 1) {
        console.log("user socket deleted from redis successfully!")
      } else{
        console.log("user socket from redis delete fail")
      }
    });
  });
})

app.locals.io = app.io;

module.exports = app;




