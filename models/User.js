const { DataTypes, Model } = require('sequelize')

const sequelize = require('./connect')

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  nickname: DataTypes.STRING,
  sex: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  phone: DataTypes.STRING,
  weCat: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize
})

module.exports = User
