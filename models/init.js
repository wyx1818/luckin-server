const sequelize = require('./connect')

const Address = require('./Address')
const User = require('./User')
const Shop = require('./Shop')
const Order = require('./Order')

User.hasMany(Address, {
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})
Order.hasMany(Shop, {
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

// async function syncDB () {
//   await sequelize.sync({ alter: true })
//   await sequelize.close()
// }
//
// syncDB()
