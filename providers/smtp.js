'use strict';
var nodemailer = require('nodemailer');
const smtp = require('config').get('providers.smtp');

exports.email = async (toEmail, message) => {
     if (!toEmail) {
          return Promise.reject('to email is required');
     }
     if (!message) {
          return Promise.reject('message is required');
     }
     if (!message.body) {
          return Promise.reject('message.body is required');
     }
     let data = {
          to: toEmail,
          subject: message.subject || 'esusu',
          html: message.body,
          from: '',
     };

     var transporter = nodemailer.createTransport({
          host: 'smtp.office365.com', // Office 365 server
          port: 587, // secure SMTP
          secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
          auth: {
               user: 'support@openhousegps.com ',
               pass: 'R3alt0rR3g1strat10n678&',
          },
          tls: {
               ciphers: 'SSLv3',
          },
     });

     try {
          let info = await transporter.sendMail(data);
          console.log(info);
     } catch (err) {
          console.log(err);
     }
};
