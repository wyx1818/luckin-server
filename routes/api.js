const Router = require('@koa/router')

const shopCtrl = require('../controllers/shop')
const userCtrl = require('../controllers/user')
const couponCtrl = require('../controllers/coupon')
const cartCtrl = require('../controllers/cart')
const orderCtrl = require('../controllers/order')
const addressCtrl = require('../controllers/address')

const userAuth = require('../middleware/userAuth')

const area = require('../utils/area')

const router = new Router()

router.prefix('/api')
router.use(['/test', '/cart', '/couponAuth', '/order', '/address', '/coupon'], userAuth)

router
  .get('/shop', shopCtrl.getShopList)
  .get('/banner', shopCtrl.getBanner)

  .get('/coupon', couponCtrl.getCoupon)
  .post('/coupon', couponCtrl.addCoupon)

  .post('/user/register', userCtrl.createUser)
  .post('/user/login', userCtrl.login)

  .get('/cart', cartCtrl.getCart)
  .post('/cart', cartCtrl.addCart)
  .put('/cart', cartCtrl.updateCart)
  .delete('/cart', cartCtrl.deleteCart)
  .get('/cart/num', cartCtrl.getAllCart)

  .get('/order', orderCtrl.getOrder)
  .put('/order', orderCtrl.addOrder)
  .get('/order/all', orderCtrl.getAllOrder)

  .get('/address', addressCtrl.getAddress)
  .post('/address', addressCtrl.addAddress)
  .put('/address', addressCtrl.updateAddress)
  .delete('/address', addressCtrl.deleteAddress)

  .post('/user/test', userCtrl.testToken)

module.exports = router
