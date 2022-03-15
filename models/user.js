'use strict';

const { setPassword } = require('../services/userServices');

module.exports = () => {
     var user = {
          id: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true,
               unique: true,
          },
          name: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          phone: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          countryCode: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          imgUrl: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          email: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          secondaryEmail: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          googleId: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          facebookId: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          password: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
               set: function (password) {
                    this.setDataValue('password', setPassword(password));
               },
          },
          token: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          isEmailVerified: {
               type: Sequelize.BOOLEAN,
               defaultValue: false,
          },
          isEmailNotifications: {
               type: Sequelize.BOOLEAN,
               defaultValue: true,
          },
          status: {
               type: Sequelize.ENUM,
               values: [
                    'pending',
                    'active',
                    'inactive',
                    'blocked',
                    'deleted',
                    'suspended',
               ],
               defaultValue: 'pending',
          },
          role: {
               type: Sequelize.ENUM,
               values: ['user', 'admin'],
               defaultValue: 'user',
          },
          deviceType: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          deviceId: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
     };
     return sequelize.define('user', user);
};
