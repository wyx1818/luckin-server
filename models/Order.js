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
  order_money: { // 订单金额
    type: DataTypes.DECIMAL(10, 2)
  },
  payment_method: { // 支付方式
    type: DataTypes.STRING
  },
  state: DataTypes.INTEGER,
  is_discount: DataTypes.BOOLEAN,
  coupon_id: DataTypes.INTEGER
}, {
  sequelize
})

module.exports = Order
