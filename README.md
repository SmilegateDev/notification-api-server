# notification-api-server
notification api server


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
ex) http://localhost:3000/noti/delNoti/5?method:delete
**request body**
none
**response body**
```
{
    "success": true
}
```