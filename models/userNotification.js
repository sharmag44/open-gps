'use strict';
module.exports = () => {
     var userNotification = {
          id: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true,
          },
          status: {
               type: Sequelize.ENUM,
               values: ['active', 'inactive', 'deleted'],
               defaultValue: 'active',
          },
          response: {
               type: Sequelize.ENUM,
               values: ['fail', 'success'],
               defaultValue: 'success',
          },
     };
     return sequelize.define('userNotification', userNotification);
};
