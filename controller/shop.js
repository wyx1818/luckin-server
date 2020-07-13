exports.getShopList = async ctx => {
  return ctx.body = {
    meta: 200,
    body: {
      msg: '这是商品页面'
    }
  }
}
