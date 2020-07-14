const Token = require('../token/token')

module.exports = async (ctx, next) => {
  let token = ctx.header.authorization

  if (token) {
    token = token.split(' ')[1]
    const resToken = await Token.validToken(token)
    // 解析token
    if (!resToken.err) {
      ctx.user = {
        user: resToken.decode.user,
        id: resToken.decode.id
      }
      await next()
    } else {
      ctx.status = 401
      ctx.body = {
        meta: {
          code: 401,
          msg: 'token认证失败：' + resToken.err.message
        }
      }
    }
  } else {
    ctx.status = 401
    ctx.body = {
      meta: {
        code: 401,
        msg: '缺少token'
      }
    }
  }
}
