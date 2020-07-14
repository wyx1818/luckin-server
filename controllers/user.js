const bcrypt = require('bcrypt')

const User = require('../models/User')
const Token = require('../token/token')

function errorBody (ctx, msg) {
  ctx.status = 200
  ctx.body = {
    meta: {
      code: 201,
      msg
    },
    body: null
  }
}

exports.createUser = async ctx => {
  // 获取用户传入数据
  const username = ctx.request.body.username
  const password = ctx.request.body.password

  // 判断用户名是否已经存在
  const isExist = await User.findOne({ where: { username } })

  if (isExist) {
    errorBody(ctx, '用户名已存在')
    return false
  }

  const res = await User.create({
    username,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  })

  console.log(res.toJSON())

  ctx.body = {
    meta: {
      code: 200,
      msg: '用户创建成功'
    },
    body:
      {
        username: res.username,
        date: res.createdAt.toLocaleString()
      }
  }
}

exports.login = async ctx => {
  // 获取用户传入数据
  let username = ctx.request.body.username
  const password = ctx.request.body.password

  // 判断传入字段是否为空
  try {
    username = username.trim()
    if (!password) throw new Error('密码为空')
  } catch (e) {
    errorBody(ctx, '用户名或密码为空')
    return false
  }

  // 查询对应用户名信息
  let user = await User.findOne({
    where: {
      username
    }
  })

  if (!user) {
    errorBody(ctx, '用户名或密码错误')
    return false
  }

  // 比对密码
  const isPass = bcrypt.compareSync(password, user.password)

  if (isPass) {
    user = user.toJSON()

    const tokenInfo = {
      user: user.username,
      id: user.id
    }

    // 创建token
    const token = Token.addToken(tokenInfo)

    ctx.body = {
      meta: {
        code: 200,
        msg: '登陆成功'
      },
      body: {
        user: user.username,
        token
      }
    }
  } else {
    errorBody(ctx, '用户名或密码错误')
  }
}

exports.testToken = ctx => {
  let token = ctx.request.header.authorization
  if (token) token = token.split(' ')[1]

  console.log(Token.validToken(token))

  ctx.body = {
    body: Token.validToken(token)
  }
}
