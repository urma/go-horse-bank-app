/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */

const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const UserModelFactory = function(sequelize) {
  const columns = {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  };

  const indexes = {
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
      {
        unique: true,
        fields: ['passwordHash'],
      },
    ],
  };

  const UserModel = sequelize.define('users', columns, indexes);

  /* Populate password hash from plaintext password using bcrypt */
  UserModel.prototype.setPassword = function(password) {
    return new Promise((resolve) => {
      bcrypt.hash(password, 0x10000).then((hash) => {
        this.setDataValue('passwordHash', hash);
        return resolve(this);
      });
    });
  };

  /* Authenticate a user from plaintext username & password */
  UserModel.authenticate = function(email, password) {
    return new Promise((resolve) => {
      UserModel.findOne({ where: { email }, rejectOnEmpty: true }).then((user) => {
        // eslint-disable-next-line arrow-body-style
        bcrypt.compare(password, user.passwordHash).then((result) => {
          return result ? resolve(user) : resolve(null);
        });
      // eslint-disable-next-line arrow-body-style
      }).catch(() => {
        return null;
      });
    });
  };

  return UserModel;
};

module.exports = UserModelFactory;
