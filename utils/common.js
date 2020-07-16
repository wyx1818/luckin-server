exports.errorBody = (ctx, msg, code) => {
  code = code || 400
  ctx.status = code
  ctx.body = {
    meta: {
      code,
      msg
    }
  }
}

exports.deleteInfo = (data, opt) => {
  return data.map(item => {
    if (opt) {
      for (const attr of opt) {
        delete item[attr]
      }
    }
    return item
  })
}

exports.jsonData = (data) => {
  return JSON.parse(JSON.stringify(data))
}

exports.prefixZero = (num, n) => {
  return (Array(n).join(0) + num).slice(-n)
}
