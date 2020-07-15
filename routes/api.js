const Router = require('@koa/router')

const shopCtrl = require('../controllers/shop')
const userCtrl = require('../controllers/user')
const couponCtrl = require('../controllers/coupon')
const cartCtrl = require('../controllers/cart')
const orderCtrl = require('../controllers/order')

const userAuth = require('../middleware/userAuth')

const router = new Router()

router.prefix('/api')
router.use(['/test', '/cart', '/couponAuth', '/order'], userAuth)

router
  .get('/shop', shopCtrl.getShopList)
  .get('/banner', shopCtrl.getBanner)

  .get('/coupon', couponCtrl.getCoupon)
  .get('/couponAuth', couponCtrl.getCouponAuth)

  .post('/user/register', userCtrl.createUser)
  .post('/user/login', userCtrl.login)

  .post('/cart', cartCtrl.addCart)
  .put('/cart', cartCtrl.updateCart)
  .get('/cart', cartCtrl.getCart)
  .delete('/cart', cartCtrl.deleteCart)
  .get('/cart/num', cartCtrl.getAllCart)

  .get('/order', orderCtrl.getOrder)
  .put('/order', orderCtrl.addOrder)
  .get('/order/all', orderCtrl.getAllOrder)

  .post('/user/test', userCtrl.testToken)

module.exports = router
