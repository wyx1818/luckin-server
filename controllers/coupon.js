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
