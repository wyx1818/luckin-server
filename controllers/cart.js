const Cart = require('../models/Cart')
const Shop = require('../models/Shop')
const User = require('../models/User')

const { errorBody } = require('../utils/common')

function getPrice (cup, price) {
  switch (cup) {
    case 0:
      return price
    case 1:
      return price + 3
    case 2:
      return price + 5
    default:
      return price
  }
}

async function getTotal (ctx) {
  const resAll = await Cart.findAll({ where: { UserId: ctx.user.id, OrderId: null } })

  return resAll.reduce((prev, item) => {
    prev.numTotal += item.amount
    prev.priceTotal += item.amount * item.shop_price
    return prev
  }, { numTotal: 0, priceTotal: 0 })
}

exports.addCart = async ctx => {
  const dataBody = ctx.request.body

  const mode = [0, 1, 2, null, '0', '1', '2', 'null']

  if (!dataBody.shop_id) return errorBody(ctx, '请传入商品ID')
  if (!dataBody.amount) return errorBody(ctx, '请传入商品数量')
  if (!mode.includes(dataBody.cup)) return errorBody(ctx, '规格有误')
  if (!mode.includes(dataBody.temperature)) return errorBody(ctx, '温度有误')
  if (!mode.includes(dataBody.sweetness)) return errorBody(ctx, '甜度有误')

  let resSuccess, isExist
  // 判断商品是否已存在
  if (dataBody.cup !== 'null' && dataBody.temperature !== 'null' && dataBody.sweetness !== 'null') {
    isExist = await Cart.findOne({
      where: {
        shop_id: dataBody.shop_id,
        cup: dataBody.cup,
        temperature: dataBody.temperature,
        sweetness: dataBody.sweetness,
        UserId: ctx.user.id,
        OrderId: null
      }
    })
  } else {
    dataBody.cup = dataBody.temperature = dataBody.sweetness = null
    isExist = await Cart.findOne({ where: { shop_id: dataBody.shop_id } })
  }

  if (isExist) {
    const total = isExist.amount + parseInt(dataBody.amount)
    resSuccess = await isExist.update({ amount: total })

    const totalShop = await getTotal(ctx)

    ctx.body = {
      meta: {
        code: 200,
        msg: '更新成功'
      },
      body: {
        Date: resSuccess.updatedAt,
        total: totalShop
      }
    }
  } else {
    const resUser = await User.findOne({ where: { id: ctx.user.id } })
    let resShop = await Shop.findOne({ where: { id: dataBody.shop_id } })

    if (!resShop) return errorBody(ctx, '商品id有误')

    resShop = resShop.toJSON()

    resSuccess = await resUser.createCart({
      cup: dataBody.cup,
      temperature: dataBody.temperature,
      sweetness: dataBody.sweetness,
      amount: dataBody.amount,
      shop_id: dataBody.shop_id,
      shop_name: resShop.shop_name,
      shop_imgUrl: resShop.shop_imgUrl,
      shop_price: getPrice(parseInt(dataBody.cup), resShop.shop_price)
    })
    const total = await getTotal(ctx)
    ctx.body = {
      meta: {
        code: 200,
        msg: '添加成功'
      },
      body: {
        total,
        Date: resSuccess.updatedAt
      }
    }
  }
}

exports.getCart = async ctx => {
  let res = await Cart.findAll({ where: { UserId: ctx.user.id, OrderId: null } })

  res = JSON.parse(JSON.stringify(res))

  res = res.map(item => {
    delete item.UserId
    delete item.createdAt
    delete item.OrderId
    return item
  })
  const total = await getTotal(ctx)
  ctx.body = {
    meta: {
      code: 200,
      msg: '购物车列表获取成功'
    },
    body: {
      total,
      data: res
    }
  }
}

exports.updateCart = async ctx => {
  const id = ctx.request.body.id
  const amount = parseInt(ctx.request.body.amount)

  if (amount < 1) {
    errorBody(ctx, '数量不能小于1')
    return false
  }

  if (!id) {
    ctx.status = 400
    ctx.body = {
      meta: {
        code: 400,
        msg: '缺少购物车条目ID'
      }
    }
    return false
  } else if (!amount) {
    ctx.status = 400
    ctx.body = {
      meta: {
        code: 400,
        msg: '缺少数量'
      }
    }
    return false
  }

  const resUpdate = await Cart.update({ amount }, { where: { id, UserId: ctx.user.id } })

  if (resUpdate[0]) {
    const total = await getTotal(ctx)

    ctx.body = {
      meta: {
        code: 200,
        msg: '数据更新成功'
      },
      body: {
        total
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      meta: {
        code: 400,
        msg: '该用户没有这条数据，请检查数据id是否正确'
      }
    }
  }
}

exports.deleteCart = async ctx => {
  const id = ctx.request.body.id
  console.log(id)
  const res = await Cart.destroy({ where: { id, UserId: ctx.user.id } })

  if (res) {
    const total = await getTotal(ctx)
    ctx.body = {
      meta: {
        code: 200,
        msg: '数据删除成功'
      },
      body: {
        total
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      meta: {
        code: 400,
        msg: '没有该条数据'
      }
    }
  }
}

exports.getAllCart = async ctx => {
  const { numTotal } = await getTotal(ctx)

  ctx.body = {
    meta: {
      code: 200,
      msg: '获取总数成功'
    },
    body: {
      numTotal
    }
  }
}
