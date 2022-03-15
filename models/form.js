'use strict';
module.exports = () => {
     var model = {
          id: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true,
               unique: true,
          },
          title: {
               type: Sequelize.STRING,
               allowNull: true,
               defaultValue: null,
          },
     };

     return sequelize.define('form', model);
};
