module.exports = function (socket) {

  console.log('player connected');

  socket.broadcast.emit('player:enter', socket.handshake.address);

  socket.on('player:move', function (data) {
    socket.broadcast.emit('player:move', data);
  });

  socket.on('disconnect', function () {
    console.log('player disconnected')
    socket.broadcast.emit('player:left', socket.handshake.address);
  });

};
