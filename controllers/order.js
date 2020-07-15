const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Address = require('../models/Address')
const Coupon = require('../models/Coupon')

function jsonData (data) {
  return JSON.parse(JSON.stringify(data))
}

function deleteInfo (data, opt) {
  return data.map(item => {
    if (opt) {
      for (const attr of opt) {
        delete item[attr]
      }
    }
    delete item.UserId
    delete item.createdAt
    delete item.updatedAt
    return item
  })
}

function errorBody (ctx, msg) {
  ctx.status = 400
  ctx.body = {
    meta: 400,
    msg
  }
}

async function checkOrderData (ctx) {
  let coupon, address, payment
  let resCoupon
  // 校验传入数据
  try {
    if (ctx.request.body.is_discount || ctx.request.body.coupon_id) {
      coupon = JSON.parse(ctx.request.body.coupon_id)

      if (typeof coupon !== 'number') throw new Error('优惠券参数非法')

      // 查询优惠券
      resCoupon = jsonData(await Coupon.findOne({ where: { id: coupon, UserId: ctx.user.id } }))
      // 判断优惠券
      if (!resCoupon) {
        errorBody(ctx, '没有这张优惠券')
        return false
      } else if (resCoupon && resCoupon.is_used) {
        errorBody(ctx, '优惠券已被使用')
        return false
      }
    }

    address = JSON.parse(ctx.request.body.address_id)
    payment = JSON.parse(ctx.request.body.payment)

    if (typeof address !== 'number') throw new Error('地址参数非法')
    if (![0, 1, 2].includes(payment)) throw new Error('支付方式非法')
  } catch (e) {
    console.log('创建订单接收参数出现错误', e.message)
    errorBody(ctx, '传参有误')
    return false
  }

  // 查询对应用户的购物车数据
  const resCart = jsonData(await Cart.findAll({
    where: {
      UserId: ctx.user.id,
      OrderId: null
    }
  }))
  // 判断购物车
  if (resCart.length === 0) {
    errorBody(ctx, '请先选择商品')
    return false
  }

  // 查询地址
  const resAddress = jsonData(await Address.findOne({ where: { id: address, UserId: ctx.user.id } }))
  // 判断地址
  if (!resAddress) {
    errorBody(ctx, '该用户没有这个地址')
    return false
  }

  return { resCart, resCoupon, payment }
}

exports.getOrder = async ctx => {
  let resCart = await Cart.findAll({ where: { UserId: ctx.user.id, OrderId: null } })
  if (resCart.length === 0) {
    errorBody(ctx, '请先选择商品')
    return false
  }
  let resAddress = await Address.findAll({ where: { UserId: ctx.user.id } })
  let resCoupon = await Coupon.findAll({ where: { UserId: ctx.user.id, is_used: false } })

  resCart = deleteInfo(jsonData(resCart))
  resAddress = deleteInfo(jsonData(resAddress))
  resCoupon = deleteInfo(jsonData(resCoupon), ['OrderId', 'is_used'])

  ctx.body = {
    meta: {
      code: 200,
      msg: '订单数据获取成功'
    },
    body: {
      Cart: resCart,
      Address: resAddress,
      Coupon: resCoupon,
      pay: [
        { id: 0, name: '余额' },
        { id: 1, name: '微信' },
        { id: 2, name: '支付宝' }
      ]
    }
  }
}

exports.addOrder = async ctx => {
  // 校验数据
  const isPass = await checkOrderData(ctx)
  if (!isPass) return false
  const { resCart, resCoupon, payment } = isPass

  // 计算订单价格
  let orderMoney = resCart.reduce((price, item) => {
    price += item.shop_price * item.amount
    return price
  }, 0)
  // 判断是否使用了优惠券
  if (resCoupon) (orderMoney -= resCoupon.sale_num)

  const resOrder = await Order.create({
    UserId: ctx.user.id,
    addressId: JSON.parse(ctx.request.body.address_id),
    order_money: orderMoney,
    payment_method: payment,
    couponId: ctx.request.body.coupon_id,
    state: 1
  })

  // 修改 购物车状态
  const resCartUpdate = await Cart.update({ OrderId: resOrder.id },
    {
      where: {
        UserId: ctx.user.id
      }
    })
  // 修改 优惠券状态
  await Coupon.update({
    OrderId: resOrder.id,
    is_used: true
  }, {
    where: {
      UserId: ctx.user.id
    }
  })

  ctx.body = {
    meta: {
      code: 200,
      msg: '加入订单成功'
    },
    body: {
      resOrder,
      resCartUpdate
    }
  }
}

exports.getAllOrder = ctx => {
  ctx.body = '获取全部订单'
}
