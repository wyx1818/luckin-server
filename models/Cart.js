const { DataTypes, Model } = require('sequelize')
const Shop = require('./Shop')
const User = require('../models/User')
const Order = require('../models/Order')

const sequelize = require('./connect')

class Cart extends Model {
}

Cart.init({
  shop_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Shop,
      key: 'id'
    }
  },
  shop_name: DataTypes.STRING,
  cup: DataTypes.INTEGER,
  temperature: DataTypes.INTEGER,
  sweetness: DataTypes.INTEGER,
  amount: DataTypes.INTEGER,
  shop_imgUrl: DataTypes.STRING,
  shop_price: DataTypes.INTEGER,
  OrderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id'
    },
    defaultValue: null
  },
  UserId: {
    type: DataTypes.INTEGER,
    defaultValue: null
  }
}, {
  sequelize
})

User.hasMany(Cart, {
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

// Cart.sync({ alter: true })

module.exports = Cart
