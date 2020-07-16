const { DataTypes, Model } = require('sequelize')
const User = require('./User')

const sequelize = require('./connect')

class Address extends Model {
}

Address.init({
  name: DataTypes.STRING,
  sex: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  phone: DataTypes.STRING,
  area: DataTypes.STRING,
  detail: DataTypes.STRING,
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tag: DataTypes.STRING,
  ZIP_code: {
    type: DataTypes.STRING
  },
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

// Address.sync({ alter: true })

module.exports = Address
