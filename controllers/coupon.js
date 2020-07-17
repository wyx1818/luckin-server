const Coupon = require('../models/Coupon')
const { deleteInfo, jsonData } = require('../utils/common')

const { errorBody } = require('../utils/common')

exports.getCoupon = async ctx => {
  const resCoupon = deleteInfo(jsonData(await Coupon.findAll({
    where: {
      UserId: ctx.user.id,
      is_used: false
    }
  })), ['OrderId', 'createdAt', 'UserId', 'is_used'])
  ctx.body = {
    meta: {
      code: 200,
      msg: '获取优惠券成功'
    },
    body: {
      resCoupon
    }
  }
}

exports.addCoupon = async ctx => {
  const key = ctx.request.body.key
  let obj = {}

  const keyList = [
    { key: '233', name: '233通用券', sale_num: 23 },
    { key: '666', name: '不6不行券', sale_num: 66 },
    { key: 'H52002', name: '无敌白嫖券', sale_num: 999 }
  ]

  const pass = keyList.some((item, index) => {
    if (item.key === key) {
      obj = {
        coupon_name: item.name,
        sale_num: item.sale_num,
        is_used: false,
        UserId: ctx.user.id
      }
    }
    return item.key === key
  })

  if (pass) {
    await Coupon.create(obj)
  } else {
    errorBody(ctx, '兑换码错误')
    return false
  }

  ctx.body = {
    meta: {
      code: 200,
      msg: '兑换成功'
    }
  }
}
