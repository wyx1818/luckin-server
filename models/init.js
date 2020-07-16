const sequelize = require('./connect')

const Address = require('./Address')
const User = require('./User')
const Shop = require('./Shop')
const Order = require('./Order')
const Coupon = require('./Coupon')
const Cart = require('./Cart')
const ShopAddress = require('./ShopAddress')

async function syncDB () {
  await sequelize.sync({ alter: true })
  await sequelize.close()
}

syncDB()
