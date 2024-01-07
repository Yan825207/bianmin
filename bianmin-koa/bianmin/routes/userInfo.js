const {
  login,
  register,
  uploadUserAvatar
} = require("../controller/userInfo")
const router = require('koa-router')()

router.prefix('/userInfo')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a userInfo!'
})

router.post('/login', login)

router.post("/register", register)

router.put("/uploadUserAvatar",uploadUserAvatar)


module.exports = router
