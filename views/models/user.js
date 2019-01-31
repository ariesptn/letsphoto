'use strict';

const passwordHash = require('../helpers/passwordHash').hash
const Op = require('sequelize').Op;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique(value) {
          return User.findAll({ where: { [Op.and]: [{ username: value }, { id: { [Op.not]: this.id } }] } })
            .then(data => {
              if (data.length > 0) {
                throw new Error('name is already registered')
              }
            })
            .catch(err => {
              throw err
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 256],
          msg: 'password is too short'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email'
        },
        isUnique(value) {
          return User.findAll({ where: { [Op.and]: [{ email: value }, { username: { [Op.not]: this.username } }] } })
            .then(data => {
              if (data.length > 0) {
                throw new Error('email is already registered')
              }
            })
            .catch(err => {
              throw err
            })
        }
      }
    },
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Image)
    User.hasMany(models.ImageComment)
    User.hasMany(models.CommentReply)
  };
  User.addHook('beforeCreate', (user, options) => {
    return new Promise((resolve, reject) => {
      return passwordHash(user.password)
        .then(hashedPassword => {
          user.password = hashedPassword
          resolve(hashedPassword)
        })
        .catch(err => {
          reject(err)
        })
    })
  })
  User.addHook('beforeUpdate', (user, options) => {
    return new Promise((resolve, reject) => {
      return passwordHash(user.password)
        .then(hashedPassword => {
          user.password = hashedPassword
          resolve(hashedPassword)
        })
        .catch(err => {
          reject(err)
        })
    })
  })
  return User;
};