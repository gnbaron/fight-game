module.exports = function (socket) {

  socket.broadcast.emit('player:enter', socket.handshake.address);

  socket.on('player:move', function (data) {
    console.log('position : '+data);
    socket.broadcast.emit('player:move', data.message);
  });

  socket.on('disconnect', function () {
    socket.broadcast.emit('player:left', socket.handshake.address);
  });

};
