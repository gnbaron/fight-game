var socket = io.connect();
socket.on('player:enter', function( data ) {
  console.log('other player connected '+data);
});

socket.on('disconnect', function() { 
    console.log('Disconnected!');
});

socket.on('player:move', function(player) { 
  draw('#0000ff', player);
});

var canvas  = document.getElementById('game');
var context = canvas.getContext('2d');
canvas.width = 1200;
canvas.height = 600;
document.body.appendChild(canvas);

var localPlayer = {
  x : canvas.width / 2,
  y : canvas.height / 2,
  speed : 250
}

var moves = function(modifier) {
  if (38 in keysDown)  
    localPlayer.y -= localPlayer.speed * modifier;
  if (40 in keysDown)  
    localPlayer.y += localPlayer.speed * modifier;
  if (37 in keysDown)  
    localPlayer.x -= localPlayer.speed * modifier;
  if (39 in keysDown) 
    localPlayer.x += localPlayer.speed * modifier;
  socket.emit("player:move", localPlayer);
  draw('#00ff00', localPlayer);
}

var draw = function(color, movement) {
  console.log("olhaaa! ");
  context.beginPath();
  context.arc(movement.x, movement.y, 10, 0, 2 * Math.PI, false);
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = color;
  context.stroke();
}

var init = function() {
  var now = Date.now();
  var modifier = (now - then) / 1000;
  console.log(modifier);
  moves(modifier);
  then = now;
  requestAnimationFrame(init);
}
var then = Date.now();
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
init();
