const Router = require('@koa/router')

const router = new Router()

const area = require('../utils/area')

router.get('/', async (ctx, next) => {
  ctx.body = '仿瑞幸咖啡后台'
})

router.get('/area', area)

module.exports = router
