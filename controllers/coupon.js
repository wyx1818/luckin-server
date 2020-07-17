const Coupon = require('../models/Coupon')
const { deleteInfo, jsonData } = require('../utils/common')

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

  const keyList = ['2333', 'H52002', '666']

  if (keyList.includes(key)) {
    await Coupon.create({ coupon_name: '全国通用券' })
  }
  ctx.body = '兑换成功'
}
