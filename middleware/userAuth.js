const Token = require('../token/token')

module.exports = async (ctx, next) => {
  try {
    const token = ctx.header.authorization.split(' ')[1]
    console.log('获取到的token', token)

    if (token) {
      const payload = await Token.validToken(token)

      if (payload) {
        ctx.user = {
          user: payload.user,
          id: payload.id
        }

        await next()
      } else {
        ctx.status = 401
        ctx.body = {
          meta: {
            code: 401,
            msg: 'token非法，验证失败'
          }
        }
      }
    } else {
      console.log('token验证失败')
      ctx.status = 401
      ctx.body = {
        meta: {
          code: 401,
          msg: '认证失败，请在请求头传递token'
        }
      }
    }
  } catch (e) {
    ctx.status = 401
    ctx.body = {
      meta: {
        code: 401,
        msg: '发生错误，请在尝试在请求头传递token'
      }
    }
  }
}
