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
          isAttachmentRequired: {
               type: Sequelize.BOOLEAN,
               defaultValue: false,
          },
          answer: {
               type: Sequelize.TEXT('long'),
               allowNull: true,
               defaultValue: null,
          },
     };
     return sequelize.define('question', model);
};
