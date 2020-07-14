const Cart = require('../models/Cart')
const Shop = require('../models/Shop')
const User = require('../models/User')

User.hasMany(Cart, {
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

exports.addCart = async ctx => {
  const dataBody = ctx.request.body
  let resSuccess, isExist
  // 判断商品是否已存在
  if (dataBody.cup && dataBody.temperature && dataBody.sweetness) {
    console.log('一般')
    isExist = await Cart.findOne({
      where: {
        shop_id: dataBody.shop_id,
        cup: dataBody.cup,
        temperature: dataBody.temperature,
        sweetness: dataBody.sweetness
      }
    })
  } else {
    console.log('食物')
    dataBody.cup = dataBody.temperature = dataBody.sweetness = null
    isExist = await Cart.findOne({ where: { shop_id: dataBody.shop_id } })
  }

  if (isExist) {
    const total = isExist.amount + parseInt(dataBody.amount)
    resSuccess = await isExist.update({ amount: total })
    ctx.body = {
      meta: {
        code: 200,
        msg: '更新成功'
      },
      body: {
        Date: resSuccess.updatedAt
      }
    }
  } else {
    console.log('创建商品', ctx.user)
    const resUser = await User.findOne({ where: { id: ctx.user.id } })
    resSuccess = await resUser.createCart({
      cup: dataBody.cup,
      temperature: dataBody.temperature,
      sweetness: dataBody.sweetness,
      amount: dataBody.amount,
      shop_id: dataBody.shop_id
    })

    ctx.body = {
      meta: {
        code: 200,
        msg: '添加成功'
      },
      body: {
        Date: resSuccess.updatedAt
      }
    }
  }
}
