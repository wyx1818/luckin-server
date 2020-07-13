const Router = require('@koa/router')

const shopCtrl = require('../controller/shop')

const router = new Router()

router.prefix('/api')

router.get('/shop', shopCtrl.getShopList)

module.exports = router
