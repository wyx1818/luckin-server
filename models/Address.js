const { DataTypes, Model } = require('sequelize')

const sequelize = require('./connect')

class Address extends Model {}

Address.init({
  name: DataTypes.STRING,
  sex: DataTypes.BOOLEAN,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  tag: DataTypes.STRING
}, {
  sequelize
})

module.exports = Address
