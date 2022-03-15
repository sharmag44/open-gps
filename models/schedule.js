'use strict';
module.exports = () => {
     var model = {
          id: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true,
               unique: true,
          },
          date: {
               type: Sequelize.DATE,
               allowNull: true,
               defaultValue: null,
          },
          startTime: {
               type: Sequelize.DATE,
               allowNull: true,
               defaultValue: null,
          },
          endTime: {
               type: Sequelize.DATE,
               allowNull: true,
               defaultValue: null,
          },
          status: {
               type: Sequelize.ENUM,
               values: [
                    'pending',
                    'approved',
                    'rejected',
                    'completed',
                    'cancelled',
               ],
               defaultValue: 'pending',
          },
     };

     return sequelize.define('schedule', model);
};
