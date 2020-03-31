<h1 align="center">Welcome to notification-api-server 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/SmilegateDev/notification-api-server#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/SmilegateDev/notification-api-server/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/SmilegateDev/notification-api-server/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/SmilegateDev/notification-api-server" />
  </a>
</p>

> socket.io 를 활용한 실시간 알림 api 서버

### 🏠 [Homepage](https://github.com/SmilegateDev/notification-api-server/blob/master/README.md)
### 🥊 [Youtube](https://www.youtube.com/watch?v=FuLnFV4qyNM&feature=youtu.be)  

## Architecture
![알림아키텍쳐](https://github.com/SmilegateDev/notification-api-server/blob/master/images/architecture.png?raw=true)
## Success images

![알림성공](https://github.com/SmilegateDev/notification-api-server/blob/master/images/notice1.png?raw=true)  

![알림성공화면](https://github.com/SmilegateDev/notification-api-server/blob/master/images/notice2.png?raw=true)

## Install

```sh
npm install
```

## Usage

```sh
npm start
```
or  
```sh
nodemon
```
## Setting

.env file setting
```
COOKIE_SECRET=
KAKAO_ID=
GOOGLE_ID=
GOOGLE_SECRET=
GMAIL_ID=
GMAIL_PASS=
REDIS_ADDRESS=
REDIS_PASSWORD=
JWT_SECRET=
```

## postman api
### POST {url}/noti/like
**request body**
```
{
	"send_user": "send_test",
	"rec_user": "rec_test",
	"post_id": "abcdefg123"
}
```
**response body**
```
{
    "success": true,
    "data": {
        "_id": "5e5a2795ba9f44515c357562",
        "send_user": "send_test",
        "rec_user": "rec_test",
        "post_id": "abcdefg123",
        "createdAt": "2020-02-29T08:57:57.639Z",
        "id": 17,
        "status": "like",
        "contents": "send_test님이 회원님의 게시물을 좋아합니다",
        "__v": 0
    }
}
```
### DELETE {url}/noti/unlike
**request body**
```
{
	"send_user": "send_test",
	"rec_user": "rec_test",
	"post_id": "abcdefg123",
	"status": "like"
}
```
**response body**
```
{
    "success": true
}
```

### POST {url}/noti/follow
**request body**
```
{
	"send_user": "send_test",
	"rec_user": "rec_test"
}
```
**response body**
```
{
    "success": true,
    "data": {
        "_id": "5e5a28cfba9f44515c357564",
        "send_user": "send_test",
        "rec_user": "rec_test",
        "createdAt": "2020-02-29T09:03:11.145Z",
        "id": 18,
        "status": "follow",
        "contents": "send_test님이 회원님을 팔로우 하기 시작했습니다",
        "__v": 0
    }
}
```

### DELETE {url}/noti/unfollow
**request body**
```
{
	"send_user": "send_test",
	"rec_user": "rec_test",
	"status": "follow"
}
```
**response body**
```
{
    "success": true
}
```

### POST {url}/noti/reply
**request body**
```
{
	"send_user": "send_test",
	"rec_user": "rec_test",
	"post_id": "abcdefg123",
	"replyContents": "댓글 테스트"
}
```
**response body**
```
{
    "success": true,
    "data": {
        "_id": "5e5a298aba9f44515c357565",
        "send_user": "send_test",
        "rec_user": "rec_test",
        "post_id": "abcdefg123",
        "createdAt": "2020-02-29T09:06:18.726Z",
        "status": "reply",
        "id": 19,
        "contents": "send_test님이 회원님의 게시물에 댓글을 남기셨습니다 : 댓글 테스트",
        "__v": 0
    }
}
```

### DELETE {url}/noti/replyBack
**request body**
```
{
	"send_user": "send_test",
	"rec_user": "rec_test",
	"status": "reply",
	"replyContents": "댓글 테스트"
}
```
**response body**
```
{
    "success": true
}
```


### DELETE {url}/noti/delNoti/:id
ex) http://localhost:3000/noti/delNoti/5  

**request body**  

none  

**response body**
```
{
    "success": true
}
```

## References
* [websocket with node.js api](https://www.dontpanicblog.co.uk/2016/04/17/websocket-push-notifications-with-node-js/)  
* [websocket vs socket.io](https://d2.naver.com/helloworld/1336)  
* [sending message to specific user](https://www.codershood.info/2016/01/24/sending-message-specific-user-socket-io/)

## Author

👤 **Tim Jaeyong Lee**

* Website: https://timjlee.github.io/
* Github: [@SmilegateDev](https://github.com/SmilegateDev)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/SmilegateDev/notification-api-server/issues). You can also take a look at the [contributing guide](https://github.com/SmilegateDev/notification-api-server/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Tim Jaeyong Lee](https://github.com/SmilegateDev).<br />
This project is [MIT](https://github.com/SmilegateDev/notification-api-server/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_