'use strict';
module.exports = () => {
     var model = {
          id: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true,
          },
          message: {
               type: Sequelize.TEXT('long'),
               allowNull: true,
               defaultValue: null,
          },
          userId: {
               type: Sequelize.INTEGER,
               allowNull: true,
               defaultValue: null,
          },
          toUserId: {
               type: Sequelize.INTEGER,
               allowNull: true,
               defaultValue: null,
          },
          chatId: {
               type: Sequelize.INTEGER,
               allowNull: true,
               defaultValue: null,
          },
          scheduleId: {
               type: Sequelize.INTEGER,
               allowNull: true,
               defaultValue: null,
          },
          isMyMessage: {
               type: Sequelize.BOOLEAN,
               allowNull: true,
               defaultValue: false,
          },
          type: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          fileName: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          fileType: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          fileUrl: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
     };
     return sequelize.define('message', model);
};
