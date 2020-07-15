const { DataTypes, Model } = require('sequelize')
const User = require('./User')

const sequelize = require('./connect')

class Address extends Model {
}

Address.init({
  name: DataTypes.STRING,
  sex: DataTypes.BOOLEAN,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  address_detail: DataTypes.STRING,
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tag: DataTypes.STRING,
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  }
}, {
  sequelize
})

// Address.sync({ force: true })

module.exports = Address
