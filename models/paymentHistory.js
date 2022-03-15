'use strict';

module.exports = () => {
     const model = sequelize.define('paymentHistory', {
          id: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true,
               unique: true,
          },
          transactionData: {
               type: Sequelize.JSON,
               allowNull: true,
               defaultValue: null,
          },
          paymentTime: {
               type: Sequelize.DATE,
               defaultValue: null,
               allowNull: true,
          },
          paymentStatus: {
               type: Sequelize.ENUM,
               values: ['pending', 'paid', 'failed', 'cancelled', 'refunded'],
               defaultValue: 'pending',
          },
          amount: {
               type: Sequelize.FLOAT,
               defaultValue: 0,
          },
     });
     return model;
};
