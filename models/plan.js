'use strict';
module.exports = () => {
     var model = {
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
          price: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
          description: {
               type: Sequelize.TEXT('long'),
               allowNull: true,
               defaultValue: null,
          },
          noOfPublishings: {
               type: Sequelize.INTEGER,
               allowNull: true,
               defaultValue: 0,
          },
          features: {
               type: Sequelize.JSON,
               allowNull: true,
               defaultValue: null,
          },
     };

     return sequelize.define('plan', model);
};
