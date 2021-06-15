var position = 42;
var player1;
var ball1;
var ballmoveX;
var ballmoveY;
var ballX = 42;
var ballY = 90;

class Steen{
	constructor(img ,posX, posY){
		this.img = img;
		this.posX = posX;
		this.posY = posY;
		this.img.src = "BreakOutBrick_Red.png";
	}
	updateSteen(){
		this.img.style.width = 15 + "%";
		this.img.style.height = 5 + "%";
		this.img.style.left = this.posX + "%";
		this.img.style.top = this.posY + "%";
	}
}
class Player{
	constructor(img, posX, posY){
		this.img = img;
		this.posX = posX;
		this.posY = posY;
		this.img.src = "breakoutPlayer.png";
		this.img.style.width = 15 + "%";
		this.img.style.height = 4 + "%";
	}
	updatePlayer(newX){
		this.img.style.left = newX + "%";
		this.img.style.top = this.posY + "%";
	}
}

class Ball{
	constructor(img , posX, posY){
		this.speed;
		this.moveX = 1;
		this.moveY;
		this.img = img;
		this.posX = posX;
		this.posY = posY;
		this.img.src = "BreakoutBall.png";
		this.img.style.borderradius = 100 + "px";
	}
	updateBall(){
		this.img.style.width = 21 + "px";
		this.img.style.height = 21 + "px";
		this.img.style.left = this.posX + "%";
		this.img.style.top = this.posY + "%";
	}
	moveXs(){
		if (ball1.posX == 100){
			ballmoveX = 0.1;
		}
		if (ball1.posX == 0){
			ballmoveX = 0.9;
		}
		if (ballmoveX > 0.5){
			ball1.posX = ball1.posX + 1;
			ballX ++;
			this.updateBall();
		}
		if (ballmoveX < 0.5){
			ball1.posX = ball1.posX - 1;
			ballX --;
			ball1.updateBall();
		}
	}
	moveYs(){
		if (ball1.posY == 0){
			ballmoveY = 0.1;
		}
		if (ball1.posY > 100){
			window.location.reload(false);
		}
		if (ballmoveY < 0.5){
			ball1.posY = ball1.posY + 1;
			ballY ++;
			this.updateBall();
		}
		if (ballmoveY > 0.5){
			ball1.posY = ball1.posY - 1;
			ballY --;
			ball1.updateBall();
		}
	}
	playerhit(){
		ballmoveY = 0.9;
	}
}
function Start(){
	console.log("-Starting-");
	var posX = 48;
	var posY = 85;
	
	var ball = document.createElement('img');
	ball.className = "ball";
	ball.style.position = "fixed";
	ball1 = new Ball(ball, posX, posY);
	ball1.updateBall();
	document.getElementById('body').appendChild(ball);
	
	var playX = 42;
	var playY = 91;
	
	var player = document.createElement('img');
	player.className = "Player";
	player.style.position = "fixed";
	player1 = new Player(player, playX, playY);
	player1.updatePlayer(playX);
	document.getElementById('body').appendChild(player);
	
	ballmoveX = Math.random();
	ballmoveY = 0.9;
	ball1.moveXs();
	ball1.moveYs();
}

function MaakSteen(){
	console.log("Creating Stone");
	var left = 10;
	var top = 5;
	for (var y = 0; y<5; y++){
		for (var z = 0; z<5; z++){
			var steen = document.createElement('img');
			steen.className = "steen";
			steen.src = "BreakOutBrick_Red.png"
			steen.style.position = "fixed";
			var steen1 = new Steen(steen, left, top);
			steen1.updateSteen();
			document.getElementById('body').appendChild(steen);
			left = left + 16;
			console.log("stone made");
		}
		top = top + 7;
		left = 10;
	}
}

function move(key){
	if ( position < 85 && key == 'ArrowRight'){
	position += 2;
	player1.updatePlayer(position);
	}
	if (position > 1 && key == 'ArrowLeft'){
	position -= 2;
	player1.updatePlayer(position);
	}
}

function moveball(){
	if (typeof ball1 !== "undefined"){
		ball1.moveYs();
		ball1.moveXs();
	}
}

function detectplayer(){
	if (ballX < position+20 && ballX > position-5){
		if(ballY-1 < 90 && ballY-1 > 88){
			ball1.playerhit();
		}
	}
}

function detecthit(){
	var blocks = document.getElementsByClassName('steen');
	for (var a = 0; a < blocks.length; a++){
		console.log(blocks[a].img.left);
		if (ballX <= blocks[a].posX+15 && ballX >= blocks[a].posX){
			if (ballY <= blocks[a].posY+5 && ballY >= blocks[a].posY){
				console.log("block hit");
			}
		}
	}
}


setInterval(detecthit, 3000);
setInterval(detectplayer, 30);
setInterval(moveball, 30);