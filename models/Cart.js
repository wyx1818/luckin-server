const { DataTypes, Model } = require('sequelize')
const Shop = require('./Shop')

const sequelize = require('./connect')

class Cart extends Model {}

Cart.init({
  shop_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Shop,
      key: 'id'
    }
  },
  cup: DataTypes.INTEGER,
  temperature: DataTypes.INTEGER,
  sweetness: DataTypes.INTEGER,
  amount: DataTypes.INTEGER
}, {
  sequelize
})

module.exports = Cart
