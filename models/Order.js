const { DataTypes, Model } = require('sequelize')

const sequelize = require('./connect')
const User = require('./User')
const Address = require('./Address')
const Coupon = require('./Coupon')

class Order extends Model {}

Order.init({
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  addressId: {
    type: DataTypes.INTEGER,
    references: {
      model: Address,
      key: 'id'
    },
    allowNull: false
  },
  order_money: { // 订单金额
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  payment_method: { // 支付方式
    type: DataTypes.INTEGER,
    allowNull: false
  },
  state: DataTypes.INTEGER, // 订单状态
  couponId: {
    type: DataTypes.INTEGER,
    references: {
      model: Coupon,
      key: 'id'
    },
    defaultValue: null
  }
}, {
  sequelize
})

// Order.sync({ alter: true })

module.exports = Order
