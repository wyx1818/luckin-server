const { DataTypes, Model } = require('sequelize')

const sequelize = require('./connect')

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  nickname: DataTypes.STRING,
  sex: DataTypes.BOOLEAN,
  phone: DataTypes.STRING,
  weCat: DataTypes.BOOLEAN
}, {
  sequelize
})

module.exports = User
