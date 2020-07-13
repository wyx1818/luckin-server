const path = require('path')

const Koa = require('koa')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')

// 导入路由
const index = require('./routes/index')
const api = require('./routes/api')

// 创建koa2服务器
const app = new Koa()

// 引入错误处理
onerror(app)

// 中间件
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, '/public')))
app.use(cors({
  origin: function (ctx) { // 设置允许来自指定域名的请求
    if (ctx.headers.origin && ctx.headers.origin.startsWith('http://localhost')) {
      return ctx.headers.origin
    }
    return '*'
  },
  maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
  credentials: true, // 是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 设置服务器支持的所有头信息字段
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] // 设置获取其他自定义字段
}))

// 使用路由
app.use(index.routes())
app.use(api.routes())

// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
