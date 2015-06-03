module.exports = function (socket) {

  console.log('player connected');

  socket.broadcast.emit('player:enter', socket.handshake.address);

  socket.on('player:move', function (data) {
    //TODO
    // console.log('position : '+data);
    // socket.broadcast.emit('player:move', data.message);
  });

  socket.on('disconnect', function () {
    console.log('player disconnected')
    socket.broadcast.emit('player:left', socket.handshake.address);
  });

};
