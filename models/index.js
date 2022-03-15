'use strict';
const fs = require('fs');
const path = require('path');
// @ts-ignore
const basename = path.basename(module.filename);

let initModels = () => {
     let db = {};
     fs.readdirSync(__dirname)
          .filter((file) => {
               return file.indexOf('.') !== 0 && file !== basename;
          })
          .forEach((file) => {
               const model = require(path.join(__dirname, file))(
                    sequelize,
                    Sequelize
               );
               db[model.name] = model;
               // model.sync({ alter: true });
          });

     Object.keys(db).forEach((modelName) => {
          if (db[modelName].associate) {
               db[modelName].associate(db);
          }
     });

     db.user.hasMany(db.property);
     db.property.belongsTo(db.user);

     db.user.hasMany(db.propertyLike);
     db.propertyLike.belongsTo(db.user);

     db.property.hasMany(db.propertyLike);
     db.propertyLike.belongsTo(db.property);

     db.user.hasMany(db.chat, {
          as: 'user1',
          foreignKey: 'user1Id',
     });
     db.chat.belongsTo(db.user, {
          as: 'user1',
          foreignKey: 'user1Id',
     });

     db.user.hasMany(db.chat, {
          as: 'user2',
          foreignKey: 'user2Id',
     });
     db.chat.belongsTo(db.user, {
          as: 'user2',
          foreignKey: 'user2Id',
     });

     db.user.hasMany(db.chat, {
          as: 'blockedBy',
          foreignKey: 'blockedById',
     });
     db.chat.belongsTo(db.user, {
          as: 'blockedBy',
          foreignKey: 'blockedById',
     });

     db.property.hasMany(db.chat);
     db.chat.belongsTo(db.property);

     db.property.hasMany(db.schedule);
     db.schedule.belongsTo(db.property);

     db.property.hasMany(db.form);
     db.form.belongsTo(db.property);

     db.form.hasMany(db.question);
     db.question.belongsTo(db.form);

     db.user.hasMany(db.schedule);
     db.schedule.belongsTo(db.user);

     db.user.hasMany(db.userNotification);
     db.userNotification.belongsTo(db.user);

     db.notification.hasMany(db.userNotification);
     db.userNotification.belongsTo(db.notification);

     db.user.hasOne(db.plan);
     db.plan.belongsTo(db.user);

     db.user.hasMany(db.paymentHistory);
     db.paymentHistory.belongsTo(db.user);

     db.plan.hasMany(db.paymentHistory);
     db.paymentHistory.belongsTo(db.plan);

     return db;
};
module.exports = initModels();
