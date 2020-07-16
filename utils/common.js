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
    delete item.UserId
    delete item.createdAt
    delete item.updatedAt
    return item
  })
}

exports.jsonData = (data) => {
  return JSON.parse(JSON.stringify(data))
}
