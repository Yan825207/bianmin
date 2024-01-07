const router = require('koa-router')()
const {
  trendsImgs,publishTrend,getTrendList
} = require("../controller/index")
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
// 上传动态图片
router.post('/publish/trendsImgs', trendsImgs)
// 发布动态
router.post("/publish/trend",publishTrend)
// 获取动态列表
router.get("/getTrendList",getTrendList)

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
