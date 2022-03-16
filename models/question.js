'use strict';
module.exports = () => {
     var model = {
          id: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true,
               unique: true,
          },
          question: {
               type: Sequelize.TEXT('long'),
               allowNull: true,
               defaultValue: null,
          },
          answer: {
               type: Sequelize.TEXT('long'),
               allowNull: true,
               defaultValue: null,
          },
          file: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
     };
     return sequelize.define('question', model);
};
