const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
// const cors = require('@koa/cors');
const index = require('./routes/index')
const users = require('./routes/users')
const auth = require('./routes/auth')
const CONFIG = require('./config/session')
const allCompose = require('./middleware')

// error handler
onerror(app)
app.keys = ['some secret hurr']



app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(logger())
app.use(session(CONFIG, app))
app.use(require('koa-static')(__dirname + '/public'))
app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
)
//middleware
app.use(allCompose)
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(auth.routes(), auth.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
