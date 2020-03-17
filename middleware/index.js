const compose = require('koa-compose')
//401
const session_middle = async (ctx, next) => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return
  await next()
}
// logger
const logger = async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}
const allCompose = compose([session_middle, logger])

module.exports = allCompose
