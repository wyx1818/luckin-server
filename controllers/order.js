// const Order = require('../models/Order')
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

exports.getOrder = async ctx => {
  let resCart = await Cart.findAll({ where: { UserId: ctx.user.id } })
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

exports.putOrder = ctx => {

}

exports.getAllOrder = ctx => {
  ctx.body = '获取全部订单'
}
