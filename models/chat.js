'use strict';
module.exports = () => {
     var chat = {
          id: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true,
               unique: true,
          },
          lastMessage: {
               type: Sequelize.TEXT('long'),
               allowNull: true,
               defaultValue: null,
          },
          user1MessageCount: {
               type: Sequelize.INTEGER,
               allowNull: true,
               defaultValue: null,
          },
          user2MessageCount: {
               type: Sequelize.INTEGER,
               allowNull: true,
               defaultValue: null,
          },
          lastMessageUpdateTime: {
               type: Sequelize.DATE,
               allowNull: true,
               defaultValue: null,
          },
          status: {
               type: Sequelize.ENUM,
               values: ['active', 'inactive', 'blocked', 'deleted'],
               defaultValue: 'active',
          },
          user1name: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          user2name: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
     };
     return sequelize.define('chat', chat);
};
