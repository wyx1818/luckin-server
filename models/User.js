const { DataTypes, Model } = require('sequelize')

const sequelize = require('./connect')

class User extends Model {
}

User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  nickname: {
    type: DataTypes.STRING,
    defaultValue: '还没有昵称呢'
  },
  sex: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  phone: DataTypes.STRING,
  weCat: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userImg: {
    type: DataTypes.STRING,
    defaultValue: '/images/avatar/default.jpeg'
  }
}, {
  sequelize
})

module.exports = User
