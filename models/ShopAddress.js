const { DataTypes, Model } = require('sequelize')

const sequelize = require('./connect')

class ShopAddress extends Model {
}

ShopAddress.init({
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  area: DataTypes.STRING,
  detail: DataTypes.STRING,
  distance: DataTypes.INTEGER
}, {
  sequelize
})

// ShopAddress.sync({ alter: true })

module.exports = ShopAddress
