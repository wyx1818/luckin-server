const Router = require('@koa/router')

const shopCtrl = require('../controllers/shop')
const userCtrl = require('../controllers/user')
const couponCtrl = require('../controllers/coupon')

const userAuth = require('../middleware/userAuth')

const router = new Router()

router.prefix('/api')
router.use(['/test'], userAuth)

router
  .get('/shop', shopCtrl.getShopList)
  .get('/banner', shopCtrl.getBanner)
  .get('/test', couponCtrl.getCouponAuth)
  .get('/coupon', couponCtrl.getCoupon)

  .post('/user/register', userCtrl.createUser)
  .post('/user/login', userCtrl.login)
  .post('/user/test', userCtrl.testToken)

module.exports = router
