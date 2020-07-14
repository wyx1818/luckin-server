const jwt = require('jsonwebtoken')
const secret = process.env.TOKEN // 密钥，不能丢

/**
 * 添加token
 * @param tokenInfo token信息
 * @returns {undefined|*}
 */
exports.addToken = tokenInfo => { // 创建token并导出
  return jwt.sign(tokenInfo, secret, { expiresIn: '1h' })
}

/**
 * 验证token的正确性
 * @param token 传入的token值
 * @returns {boolean|*} false 验证失败，其他解析值
 */
exports.validToken = token => {
  return jwt.verify(token, secret, function (err, decode) {
    return {
      decode,
      err: err
    }
  })
}
