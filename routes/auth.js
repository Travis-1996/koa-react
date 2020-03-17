const router = require('koa-router')()
const db = require('../model/db')
router.post('/login', async (ctx, next) => {
  let { username, password } = ctx.request.body
  const data = await db.findOne('user', { username, password })
  ctx.response.type = 'application/json'
  if (data) {
    ctx.session.username = data && data.username
    ctx.body = {
      code: 0,
      message: 'sucecess login'
    }
  } else {
    ctx.body = {
      code: 0,
      message: '账号或密码错误'
    }
  }
})
router.get('/resiget', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

module.exports = router
