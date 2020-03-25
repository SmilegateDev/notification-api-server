var express = require('express');
var mongoose = require('mongoose');
var { sequelize } = require('./models/User.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var logger = require('morgan');
var app = express();
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 9090 });
require('dotenv').config();

// DB setting
const driver = async () => {
  try {
      await sequelize.sync();
  } catch (err) {
      console.error('user table sync fail');
      console.error(err);
      return;
  }

  console.log('user table sync complete');
};

driver();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
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
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});

// API
app.use('/noti', require('./routes/notifications'));

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;




