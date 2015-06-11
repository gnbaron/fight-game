var heros = ['../images/batman.png', '../images/superman.png', '../images/ironman.png', '../images/greenlantern.png', '../images/spiderman.png'];

module.exports = function (socket) {
  socket.broadcast.emit('player:enter', socket.handshake.address);

  socket.on('player:move', function (data) {
    socket.broadcast.emit('player:move', data);
  });

  socket.on('monster:spawn', function (data) {
    socket.broadcast.emit('monster:spawn', data);
  });

  socket.on('disconnect', function () {
    socket.broadcast.emit('player:left', socket.handshake.address);
  });

};
