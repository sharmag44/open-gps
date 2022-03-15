'use strict';
const push = require('../providers/fcm');
const _ = require('underscore');
const async = require('async');
const moment = require('moment');
const { DataBrew } = require('aws-sdk');

exports.create = (data, user) => {
     let model = {
          title: data.title || 'WAGKART',
          description: data.description,
          titleHindi: data.titleHindi || 'WAGKART',
          descriptionHindi: data.descriptionHindi,
          status: 'active',
          entityName: data.entityName,
          entityId: data.entityId,
          dataName: data.dataName || data.entityName,
          dataId: data.dataId || data.entityId,
          imgUrl: data.imgUrl,
     };
     return new db.notification(model).save().then((notification) => {
          updateUserNotification({ user, notification });
     });
};

let updateUserNotification = ({ user, notification }) => {
     let allUsers = [];
     allUsers = _.uniq([user], 'id');
     async.eachSeries(allUsers, async (user, next) => {
          let model = {
               status: notification.status === 'deleted' ? 'deleted' : 'active',
               notificationId: notification.id,
          };

          const userNotification = await new db.userNotification(model).save();

          if (!user.isNotification) {
               return;
          }
          if (user.deviceId && user.deviceType) {
               if (user.deviceType == 'android') {
                    push.sendAndroidPush(
                         user.deviceId,
                         {
                              title: notification.title,
                              text: notification.description,
                              imgUrl: notification.imgUrl,
                              entityId: notification.entityId,
                              entityName: notification.entityName,
                              dataId: notification.dataId,
                              dataName: notification.dataName,
                         },
                         (err) => {
                              userNotification.response = err
                                   ? 'fail'
                                   : 'success';
                              userNotification.save();
                              next();
                         }
                    );
               }
               if (user.deviceType == 'ios') {
                    push.sendIOSPush(
                         user.deviceId,
                         {
                              title: notification.title,
                              text: notification.description,
                              imgUrl: notification.imgUrl,
                              entityId: notification.entityId,
                              entityName: notification.entityName,
                              dataId: notification.dataId,
                              dataName: notification.dataName,
                         },
                         (err) => {
                              userNotification.response = err
                                   ? 'fail'
                                   : 'success';
                              userNotification.save();
                              next();
                         }
                    );
               }
               if (user.deviceType == 'web') {
                    push.sendIOSPush(
                         user.deviceId,
                         {
                              title: notification.title,
                              text: notification.description,
                              imgUrl: notification.imgUrl,
                              entityId: notification.entityId,
                              entityName: notification.entityName,
                              dataId: notification.dataId,
                              dataName: notification.dataName,
                         },
                         (err) => {
                              userNotification.response = err
                                   ? 'fail'
                                   : 'success';
                              userNotification.save();
                              next();
                         }
                    );
               }
          }
     });
};

exports.newScheduleRequest = async ({ scheduleId }) => {
     const schedule = await db.schedule.findOne({
          where: {
               id: scheduleId,
          },
          include: [db.user, { model: db.property, include: db.user }],
     });
     try {
          const data = {
               title: 'New schedule request',
               description: 'New schedule request',
               status: 'active',
               entityName: 'newScheduleRequest',
               entityId: schedule.user.id,
          };
          let notification = await new db.notification(data).save();
          updateUserNotification({
               user: schedule.property.user,
               notification,
          });
     } catch (e) {
          throw e;
     }
};

exports.scheduleRequestUpdated = async ({ scheduleId }) => {
     const schedule = await db.schedule.findOne({
          where: {
               id: scheduleId,
          },
          include: [db.user, { model: db.property, include: db.user }],
     });
     try {
          const data = {
               title: 'Schedule request updated',
               description: 'Schedule request updated',
               status: 'active',
               entityName: 'scheduleRequestUpdated',
               entityId: schedule.user.id,
          };
          let notification = await new db.notification(data).save();
          updateUserNotification({
               user: schedule.property.user,
               notification,
          });
     } catch (e) {
          throw e;
     }
};

exports.chatLastMessage = async ({ chat, fromUser, toUser, lastMessage }) => {
     try {
          const data = {
               title: 'New message',
               description: lastMessage,
               status: 'active',
               entityName: 'chatLastMessage',
               entityId: fromUser.id,
               dataName: 'chat',
               dataId: chat.id,
          };
          let notification = await new db.notification(data).save();
          updateUserNotification({
               user: toUser,
               notification,
          });
     } catch (e) {
          throw e;
     }
};
