const Router = require('@koa/router')

const shopCtrl = require('../controllers/shop')
const userCtrl = require('../controllers/user')

const userAuth = require('../middleware/userAuth')

const router = new Router()

router.prefix('/api')
router.use(['/test'], userAuth)

router
  .get('/shop', shopCtrl.getShopList)
  .get('/banner', shopCtrl.getBanner)
  .get('/test', shopCtrl.test)

  .post('/user/register', userCtrl.createUser)
  .post('/user/login', userCtrl.login)
  .post('/user/test', userCtrl.testToken)

module.exports = router
