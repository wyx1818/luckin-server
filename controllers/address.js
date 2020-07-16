const Address = require('../models/Address')

exports.getAddress = async ctx => {
  const resAddress = await Address.findAll({ where: { UserId: ctx.user.id } })
  console.log(resAddress)
  ctx.body = {
    meta: {
      code: 200,
      msg: '获取地址成功'
    },
    body: {
      resAddress
    }
  }
}

exports.addAddress = async ctx => {
  ctx.body = ctx.user.id
}
