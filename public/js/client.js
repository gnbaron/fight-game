var socket = io.connect();

var UP    = 'UP',
    LEFT  = 'LEFT',
    DOWN  = 'DOWN',
    RIGHT = 'RIGHT';

var player = null;
//?var players[] = null; //TODO

var canvas  = document.getElementById('game');
var context = canvas.getContext('2d');

player = new Player(50, 50);

socket.on('player:enter', function( data ) {
  console.log('other player connected '+data);
});

socket.on('disconnect', function() {
    console.log('Disconnected!');
});

var Player = Class.extend ({

  init : function(x, y) {
    this.x = x;
    this.y = y;
  },
  setX : function(x){
    this.x = x;
  },
  getX : function(){
    return this.x;
  },
  setY : function(y){
    this.y = y;
  },
  getY : function(){
    return this.y;
  },
  draw : function(){
    //TODO
  },
  move : function() {
    this.x += 1;
    this.y += 1;
  },
  moveUP : function() {
    this.y--;
  },
  moveLEFT : function() {
    this.x--;
  },
  moveDOWN : function() {
    this.y++;
  },
  moveRIGHT : function() {
    this.x++;
  }
});

function checkKeyCode(event) {

    var keyCode;
    if(event == null) {
      keyCode = window.event.keyCode;
    } else {
      keyCode = event.keyCode;
    }

    switch(keyCode) {
      case 38: // UP
        player.moveUP();
        socket.send(UP);
      break;
      case 37: // LEFT
        player.moveLEFT();
        socket.send(LEFT);
      break;
      case 40: //DOWN
        player.moveDOWN();
        socket.send(DOWN);
      break;
      case 39: // RIGHT
        player.moveRIGHT();
        socket.send(RIGHT);
      break;
      default:
      break;
    }
}

function update() {
    player.draw();
}

var FPS = 30;

setInterval(function() {
    update();
}, 1000/FPS);

function init() {
    document.onkeydown = checkKeyCode;
}

init();
