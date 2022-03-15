require('dotenv').config();
const app = require('./app');
var http = require('http');
var config = require('config').get('webServer');
const messageMapper = require('./mappers/message');

try {
     require('./settings/database').configure(app);
} catch (err) {
     console.log(err);
}

var server = http.createServer(app);
const io = require('socket.io')(server, { origin: '*' });

// @ts-ignore
io.on('connection', (socket) => {
     socket.on('chatStart', async (chatId) => {
          socket.join(chatId);
          socket.emit('userJoined', socket.id);
     });

     socket.on('messageSent', async (message) => {
          const messageData = await db.message.create(message);
          socket.to(messageMapper.toModel(messageData));
     });

     socket.on('chatLeave', async (chatId) => {
          socket.leave(chatId);
     });
});

server.listen(config.port, function () {
     console.log('listening on port:' + config.port);
});
