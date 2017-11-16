const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'go-horse.db',
});

const User = require('./user')(sequelize);

module.exports = {
  sequelize,
  User,
};
