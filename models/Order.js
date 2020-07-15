const { DataTypes, Model } = require('sequelize')

const sequelize = require('./connect')

class Order extends Model {}

Order.init({
  customer_id: { // 用户ID
    type: DataTypes.INTEGER
  },
  customer_name: { // 用户姓名
    type: DataTypes.STRING
  },
  address: { // 用户地址
    type: DataTypes.STRING
  },
  phone: { // 用户电话
    type: DataTypes.STRING
  },
  order_money: { // 订单金额
    type: DataTypes.DECIMAL(10, 2)
  },
  payment_method: { // 支付方式
    type: DataTypes.INTEGER
  },
  state: DataTypes.INTEGER, // 订单状态
  is_discount: DataTypes.BOOLEAN, // 是否使用优惠券
  coupon_id: DataTypes.INTEGER // 优惠券id
}, {
  sequelize
})

Order.sync({ alter: true })

module.exports = Order
