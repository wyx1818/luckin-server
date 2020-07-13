const path = require('path')

const Koa = require('koa')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

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

// 使用路由
app.use(index.routes())
app.use(api.routes())

// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
