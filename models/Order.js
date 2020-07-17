const { DataTypes, Model } = require('sequelize')

const sequelize = require('./connect')

class Order extends Model {}

Order.init({
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  couponId: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  addressId: {
    type: DataTypes.INTEGER,
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
  state: { // 订单状态
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  isDelivery: { // 是否外卖
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  sequelize
})

// Order.sync({ alter: true })

module.exports = Order
