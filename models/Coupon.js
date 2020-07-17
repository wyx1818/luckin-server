const { DataTypes, Model } = require('sequelize')

const sequelize = require('./connect')
const User = require('./User')

class Coupon extends Model {
}

Coupon.init({
  coupon_name: DataTypes.STRING,
  sale_num: DataTypes.INTEGER,
  is_used: DataTypes.BOOLEAN,
  OrderId: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    defaultValue: null
  }
}, {
  sequelize
})

// Coupon.sync({ alter: true })

module.exports = Coupon
