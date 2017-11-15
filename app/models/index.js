const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 10000,
  },
  storage: 'go-horse.db',
});

const userModel = require('./user')(sequelize);

module.exports = {
  // eslint-disable-next-line object-shorthand
  sequelize: sequelize,
  User: userModel,
};
