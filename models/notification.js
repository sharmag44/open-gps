'use strict';
module.exports = () => {
     var notification = {
          id: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true,
          },
          title: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          description: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          entityName: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          dataName: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          imgUrl: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          entityId: {
               type: Sequelize.INTEGER,
               defaultValue: null,
          },
          dataId: {
               type: Sequelize.INTEGER,
               defaultValue: null,
          },
          status: {
               type: Sequelize.ENUM,
               values: ['active', 'inactive'],
               defaultValue: null,
          },
     };
     return sequelize.define('notification', notification);
};
