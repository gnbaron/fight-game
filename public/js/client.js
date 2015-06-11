var backGroundImg = new Image();
backGroundImg.src = '../images/background.png';
var heroImg = new Image();
heroImg.src = '../images/spiderman.png';
var heroImg2 = new Image();
heroImg2.src = '../images/ironman.png';
var monsterImg = new Image();
monsterImg.src = '../images/monster.png';


var socket = io.connect();
socket.on('player:enter', function( data ) {
  console.log('other player connected '+data);
});
socket.on('disconnect', function() { 
    console.log('Disconnected!');
});
socket.on('monster:spawn', function(data) { 
    monster = data;
});
socket.on('player:move', function(data) { 
  otherPlayer = data;
});

var canvas  = document.getElementById('game');
var context = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 420;
document.body.appendChild(canvas);

var otherPlayer = {};
var monster = {};
var localPlayer = {
  x : canvas.width / 2,
  y : canvas.height / 2,
  speed : 250,
  numberOfMonsters : 0
}

var limitCanvas = function (hero) { 
  var isHeightLimited = hero.y >= canvas.height + 32;
  var isWidthLimited = hero.x >= canvas.width + 21;
  var isHeightUnlimited = hero.y <= -32;
  var isWidthUnlimited = hero.x <= -32;

  if(isHeightLimited)
    hero.y = -32; 
  else if (isHeightUnlimited)
    hero.y = canvas.height;
  if(isWidthLimited)
    hero.x = -32;
  else if(isWidthUnlimited)
    hero.x = canvas.width;
};

var spawnMonsters = function () {
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
  socket.emit('monster:spawn', monster);
};


var seeTouchs = function() {
  var theyTouched = (localPlayer.x <= (monster.x + 32) 
    && monster.x <= (localPlayer.x + 32) 
    && localPlayer.y <= (monster.y + 32) 
    && monster.y <= (localPlayer.y + 32)); 

  if(theyTouched) {
    localPlayer.numberOfMonsters++;
    localPlayer.speed++;
    spawnMonsters();
  }
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
  limitCanvas(localPlayer);
  seeTouchs();
  socket.emit("player:move", localPlayer);
  draw();
}

var draw = function() {
  context.drawImage(backGroundImg, 0 , 0);
  context.drawImage(heroImg, localPlayer.x, localPlayer.y, 40, 45);
  context.drawImage(heroImg2, otherPlayer.x, otherPlayer.y, 40, 45);
  context.drawImage(monsterImg, monster.x, monster.y, 30, 35);
  context.fillStyle = "rgb(250, 250, 250)";
  context.font = "24px Helvetica";
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillText("You: "+ localPlayer.numberOfMonsters +" x Him: " + otherPlayer.numberOfMonsters, 32, 32);
}

var init = function() {
  var now = Date.now();
  var modifier = (now - then) / 1000;
  moves(modifier);
  then = now;
  requestAnimationFrame(init);
}

var then = Date.now();
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
spawnMonsters();
init();