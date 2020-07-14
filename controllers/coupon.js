const Coupon = require('../models/Coupon')
const User = require('../models/User')

User.hasMany(Coupon, {
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

exports.getCoupon = ctx => {
  ctx.body = {
    meta: {
      code: 200,
      msg: '获取优惠券成功'
    },
    body: [
      { id: 1, name: '全国通用券', saleNum: 22 },
      { id: 2, name: '成都通用券', saleNum: 21 },
      { id: 3, name: '全国通用券', saleNum: 20 }
    ]
  }
}

exports.getCouponAuth = async ctx => {
  let resUser
  try {
    const userInfo = ctx.user
    resUser = await User.findOne({
      where: {
        id: userInfo.id
      },
      include: Coupon
    })
    console.log('优惠券查询结果', resUser.toJSON())
  } catch (e) {
    console.log('出现错误', e)
  }
  ctx.body = {
    meta: {
      code: 200,
      msg: '获取优惠券成功'
    },
    body: resUser.Coupons
  }
}
