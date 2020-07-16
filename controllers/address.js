const Address = require('../models/Address')

const { errorBody, deleteInfo, jsonData } = require('../utils/common')

exports.getAddress = async ctx => {
  let resAddress = await Address.findAll({ where: { UserId: ctx.user.id } })

  resAddress = deleteInfo(jsonData(resAddress), ['UserId', 'createdAt', 'updatedAt'])

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
  const reqData = ctx.request.body
  try {
    reqData.default = JSON.parse(reqData.default)
  } catch (e) {
    errorBody(ctx, '传参有误')
    return false
  }
  if (reqData.default) {
    await Address.update({ is_default: false }, { where: { UserId: ctx.user.id } })
  }

  await Address.create({
    name: reqData.name,
    sex: reqData.sex,
    phone: reqData.phone,
    area: reqData.area,
    detail: reqData.detail,
    tag: reqData.tag,
    is_default: reqData.default,
    ZIP_code: reqData.ZIP,
    UserId: ctx.user.id
  })

  ctx.body = {
    meta: {
      code: 200,
      msg: '新增地址成功'
    }
  }
}

exports.updateAddress = async ctx => {
  const reqData = ctx.request.body
  const obj = {}

  const isExist = await Address.findOne({
    where: {
      UserId: ctx.user.id,
      id: reqData.id
    }
  })

  if (!isExist) {
    errorBody(ctx, '传参有误')
    return false
  }

  // 构建要更新的数据
  for (const attr in reqData) {
    let newAttr = attr
    if (attr === 'default') newAttr = 'is_default'
    if (attr === 'ZIP') newAttr = 'ZIP_code'
    obj[newAttr] = reqData[attr]
  }

  // 判断是否要修改默认地址
  if (JSON.parse(reqData.default)) {
    await Address.update({ is_default: false }, { where: { UserId: ctx.user.id } })
  }

  // 更新数据
  await Address.update({
    ...obj,
    UserId: ctx.user.id
  }, {
    where: {
      UserId: ctx.user.id,
      id: reqData.id
    }
  })

  ctx.body = {
    meta: {
      code: 200,
      msg: '更新成功'
    }
  }
}

exports.deleteAddress = async ctx => {
  let addrId
  try {
    addrId = JSON.parse(ctx.request.body.id)
    if (typeof addrId !== 'number') throw new Error('类型不符')
  } catch (e) {
    errorBody(ctx, '传参有误')
    return false
  }

  const resAddr = await Address.destroy({ where: { id: addrId, UserId: ctx.user.id } })
  if (!resAddr) {
    errorBody(ctx, '该条数据不存在')
    return false
  }
  ctx.body = {
    meta: {
      code: 200,
      msg: '删除成功'
    }
  }
}
