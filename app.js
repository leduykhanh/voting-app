const express = require('express');
const { routes, sockets } = require('./routes');
const { sequelize } = require('./model');

const bodyParser = require('body-parser');
const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));


const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use(routes);

var server = http.listen(6969, function(){
	console.log('HTTP Server Listening on port ' + server.address().port);
});

module.exports = { app };
