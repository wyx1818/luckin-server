const { DataTypes, Model } = require('sequelize')

const sequelize = require('./connect')

class Shop extends Model {
}

Shop.init({
  shop_name: {
    type: DataTypes.STRING,
    unique: true
  },
  shop_desc: {
    type: DataTypes.STRING
  },
  shop_price: {
    type: DataTypes.INTEGER
  },
  shop_imgUrl: {
    type: DataTypes.STRING
  },
  shop_url: {
    type: DataTypes.STRING
  },
  shop_cate: {
    type: DataTypes.STRING
  },
  shop_popular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize
})

module.exports = Shop
