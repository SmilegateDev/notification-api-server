// 80 포트로 소켓을 연다
var sio = require('socket.io');
var client = require('../cache_redis');
var io = sio.listen(80);

//io.set("store", new sio.RedisStore);

// connection이 발생할 때 핸들러를 실행한다.
io.sockets.on('connection', function (socket) {  
// 클라이언트로 news 이벤트를 보낸다.
    socket.emit('server connection', { server: 'socket on' });

// 클라이언트에서 my other event가 발생하면 데이터를 받는다.
    socket.on('client connection', function (data) {  
            console.log(data);
    });

    socket.on('client log on', function(data) {

        // Save the socket id to Redis so that all processes can access it.
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
});

module.exports = io;