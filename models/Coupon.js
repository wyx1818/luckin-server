const { DataTypes, Model } = require('sequelize')

const sequelize = require('./connect')

class Coupon extends Model {
}

Coupon.init({
  coupon_name: DataTypes.STRING,
  sale_num: DataTypes.INTEGER,
  is_used: DataTypes.BOOLEAN
}, {
  sequelize
})

module.exports = Coupon
