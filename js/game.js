// Create the canvas
//var canvas = document.createElement("canvas");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//game audio
var audioLvlup = new Audio("musics/levelup.mp3");
var audioBomb = new Audio("musics/bomb.mp3");
var audioBombsub = new Audio("musics/bomb.mp3");
var audioBomb2 = new Audio("musics/bomb1.mp3");
var audioBomb2sub = new Audio("musics/bomb1.mp3");
var audioBomb3 = new Audio("musics/bomb2.mp3");
var audioBomb3sub = new Audio("musics/bomb2.mp3");
var audioBackground = new Audio("musics/backgroundMusic.wav");
var audioPress = new Audio("musics/buttonPress.mp3");
var audioGameover = new Audio("musics/gameover.mp3");
var audioGameoverPlayed = false;

// game status element
var gamepaused = false;
var gamestarted = false;
var gameovered = false;

// background size 
canvas.width = 600;
canvas.height = 670;
document.body.appendChild(canvas);

// background color
var black = 0;
var white = 0;
var rgb = 0;

function background(color){
	if(color == "black"){
		black += 1;
		if(white > 0){
			white -= 1;
		}
	}
	if(color == "white"){
		white += 1;
		if(black > 0){
			black -=1;
		}
	}
};

// Handle keyboard events
var Pause = {};
var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
addEventListener("keypress", function (e){
	//if(e.keyCode == 80){
		if(e.keyCode == 115){
			if(!gamestarted){
				audioPress.play();
			}
			if(gamestarted && gameovered){
				audioPress.play();
				audioGameoverPlayed = false;
			}
			gamestarted = true;
			if(gameovered == true){
				gameovered = false;
			}
		}
		if(gamestarted){
			if(!gameovered){
				if(e.keyCode == 112){
					audioPress.play();
				}
				if(e.keyCode in Pause){
					delete Pause[e.keyCode];
				}
				else{
					Pause[e.keyCode] = true;
				}
			}
		}
		//alert(e.keyCode);
	//}
}, false);

// handle input
var handleInput = function () {

	//Stop moving the plane
	plane.direction.x = 0;
	plane.direction.y = 0;

	if (37 in keysDown) { // Left
		plane.direction.x = -1;
	}

	if (38 in keysDown) { // Up
		plane.direction.y = -1;
	}

	if (39 in keysDown) { // Right
		plane.direction.x = 1;
	}

	if (40 in keysDown) { // Down
		plane.direction.y = 1;
	}
};

// pause the game when game started and not over yet
var handlePause = function(){
	if(!gameovered){	
		if(112 in Pause){
		gamepaused = true;
		}
		else{
		gamepaused = false;
		}
	}
};


// plane
var plane = {
	x: canvas.width/2,
	y: canvas.height/2,
	lvl: 0,
	width: 56,
	height: 46,
	speed: 5,
	bulletcolor: "",
	direction: {
		x: 0,
		y: 0,
	},
	bulletlvl1: {
		x: canvas.width/2+15,
		y: canvas.height/2 - 20,
	},
	bulletlvl2: {
		x1: canvas.width/2-12,
		y1: canvas.height/2,
		x2: 52 + canvas.width/2,
		y2: canvas.height/2,
	},
	bulletlvl3: {
		x1: canvas.width/2-12,
		y1: canvas.height/2 - 20,
		x2: canvas.width/2 + 26,
		y2: canvas.height/2 - 20,
		x3: canvas.width/2 +66,
		y3: canvas.height/2 - 20,
	},
};

// plane image
var planeReady = false;
var planeImage = new Image();
planeImage.onload = function () {
	planeReady = true;
};


// lvlup
var lvlup = {
	x: Math.random()*canvas.width,
	y:0,
	width:55,
	height:74,
	number: 1,
	speed: 2,
};

// lvlup images
lvlupDelay = 10000;
lvlupTimer = 0;
var lvlupImage = new Image();
lvlupImage.src = "images/lvlup.png";
var lvlupReady = false;


// bullet color
var Bcolor = {
	x: Math.random()*canvas.width,
	y: 0,
	color: "black",
	width:42,
	height:28,
	speed: 2,
};

// Bcolor images
BcolorDelay = 10000;
BcolorTimer = 0;
var BcolorImage = new Image();
var BcolorReady = false;

function bulletColor(){
	var color = Math.random();
	if(color < 0.5){
		Bcolor.color = "black";
		BcolorImage.src = "images/Bvlup Black.png";
	}
	else{
		Bcolor.color = "white";
		BcolorImage.src = "images/Bvlup White.png";
	}
};



// inavder 1
var Invader = function(){
	this.x = Math.random()*145;
	this.y = 0;
	this.width =55;
	this.height =53;
	this.speed = 2;
	this.ready = true;
	this.alive = true;
	this.src = "images/ET01 OG.png";
};
Invader.prototype.move = function(){
	this.y += this.speed;
};
Invader.prototype.notready = function(){
	this.ready = false;
};
Invader.prototype.dead = function(){
	this.alive = false;
};
Invader.prototype.hit = function(color){
	if(color == "white"){
		this.src = "images/ET01 White.png";
	}
	else if(color == "black"){
		this.src = "images/ET01 Black.png";	
	}
};

var Invaders = [];
// invader image
invaderDelay = 1200;
invaderTimer = 0;

// invader 2
var Invader2 = function(){
	this.x = Math.random()*131 + 200;
	this.y = 0;
	this.width = 69;
	this.height = 53;
	this.speed = 2;
	this.ready = true;
	this.alive = true;
	this.src = "images/ET02 OG.png";
};
Invader2.prototype.move = function(){
	this.y += this.speed;
};
Invader2.prototype.notready = function(){
	this.ready = false;
};
Invader2.prototype.dead = function(){
	this.alive = false;
};
Invader2.prototype.hit = function(color){
	if(color == "white"){
		this.src = "images/ET02 White.png";
	}
	else if(color == "black"){
		this.src = "images/ET02 Black.png";	
	}
};
var Invader2s = [];


//invader 3
var Invader3 = function(){
	this.x = Math.random()*124 + 400;
	this.y = 0;
	this.width = 76;
	this.height = 52;
	this.speed = 2;
	this.ready = true;
	this.alive = true;
	this.src = "images/ET03 OG.png";
};
Invader3.prototype.move = function(){
	this.y += this.speed;
};
Invader3.prototype.notready = function(){
	this.ready = false;
};
Invader3.prototype.dead = function(){
	this.alive = false;
};
Invader3.prototype.hit = function(color){
	if(color == "white"){
		this.src = "images/ET03 White.png";
	}
	else if(color == "black"){
		this.src = "images/ET03 Black.png";	
	}
};
var Invader3s = [];

//bullets
var Bullet = function(x,y){
	this.x = x;
	this.y = y;
	this.speed = 1;
	this.ready = true;
	this.shoot = false;
	this.images = "images/Bullet Black.png";
};
Bullet.prototype.move = function(){
	this.y -=this.speed;
};
Bullet.prototype.shot = function(){
	this.shoot = true;
};
Bullet.prototype.hit = function(){
	this.ready = false;
};
BulletDelay = 400;
BulletTimer = 0;
var Bullets = [];
var Bullet2s = [];
var Bullet3s = [];


// shoot the invader
function shootinvader(bullet,invader){
	if(bullet.x <= (invader.x + invader.width)
		&& invader.x <= (bullet.x + 18)
		&& bullet.y <= (invader.y + invader.height)
		&& invader.y <= (bullet.y + 27) && invader.alive)
	{ 
		return true;
	}
	else{
		return false;
	}
};
function lvlupplane(plane, lvlup){
	if(plane.x <= (lvlup.x + lvlup.width)
		&& lvlup.x <= (plane.x + plane.width)
		&& plane.y <= (lvlup.y + lvlup.height)
		&& lvlup.y <= (plane.y + plane.height))
	{
		return true;
	}
	else{
		return false;
	}
};

var checkInvaders = function(Bullets){
// shooting bullets
	for (i = 0; i < Bullets.length; i++) { 
		// sperate odd an even for audio
		// check invader 1
    	for(j = 0; j< Invaders.length; j += 2){
    		if(shootinvader(Bullets[i],Invaders[j])){
				audioBomb.play();
				Invaders[j].hit(plane.bulletcolor);
				background(plane.bulletcolor);
				Bullets.splice(i, 1);
				Invaders[j].dead();
    		}
		}
		for(j = 1; j< Invaders.length; j += 2){
    		if(shootinvader(Bullets[i],Invaders[j])){
				audioBombsub.play();
				Invaders[j].hit(plane.bulletcolor);
				background(plane.bulletcolor);
				Bullets.splice(i, 1);
				Invaders[j].dead();
    		}
		}
		//check invader 2
		for(j = 0; j< Invader2s.length; j += 2){
    		if(shootinvader(Bullets[i],Invader2s[j])){
    			audioBomb2.play();
    			Invader2s[j].hit(plane.bulletcolor);
    			background(plane.bulletcolor);
    			Bullets.splice(i, 1);
    			Invader2s[j].dead();
    		}
		}
		for(j = 1; j< Invader2s.length; j += 2){
    		if(shootinvader(Bullets[i],Invader2s[j])){
    			audioBomb2sub.play();
    			Invader2s[j].hit(plane.bulletcolor);
    			background(plane.bulletcolor);
    			Bullets.splice(i, 1);
    			Invader2s[j].dead();
    		}
		}
		// check invader 3
		for(j = 0; j< Invader3s.length; j += 2){
    		if(shootinvader(Bullets[i],Invader3s[j])){
    			audioBomb3.play();
    			Invader3s[j].hit(plane.bulletcolor);
    			background(plane.bulletcolor);
    			Bullets.splice(i, 1);
    			Invader3s[j].dead();
    		}
		}
		for(j = 1; j< Invader3s.length; j += 2){
    		if(shootinvader(Bullets[i],Invader3s[j])){
    			audioBomb3sub.play();
    			Invader3s[j].hit(plane.bulletcolor);
    			background(plane.bulletcolor);
    			Bullets.splice(i, 1);
    			Invader3s[j].dead();
    		}
		}
	}
};

//move all objects
var move = function(elapsed){
	// move the plane
	var move = (plane.speed * elapsed/10);
	plane.x += Math.round(move * plane.direction.x);
	plane.y += Math.round(move * plane.direction.y);
	
	if(plane.x < -20){
		plane.x = -20;
	}
	if(plane.x >canvas.width -10){
		plane.x = canvas.width -10;
	}
	if(plane.y < -20){
		plane.y = -20;
	}
	if(plane.y > canvas.height -10){
		plane.y  = canvas.height -10;
	}

	plane.bulletlvl1.x  = plane.x + 15;
	plane.bulletlvl1.y  = plane.y - 20;
	plane.bulletlvl2.x1 = plane.x - 12;
	plane.bulletlvl2.y1 = plane.y - 20;
	plane.bulletlvl2.x2 = plane.x + 52;
	plane.bulletlvl2.y2 = plane.y - 20;
	plane.bulletlvl3.x1 = plane.x - 12;
	plane.bulletlvl3.y1 = plane.y - 20;
	plane.bulletlvl3.x2 = plane.x + 26;
	plane.bulletlvl3.y2 = plane.y - 20;
	plane.bulletlvl3.x3 = plane.x + 66;
	plane.bulletlvl3.y3 = plane.y - 20;

	// move lvlup
	if(lvlupReady){
		lvlup.y += lvlup.speed;
	}
	// move Bcolor
	if(BcolorReady){
		Bcolor.y += Bcolor.speed;
	}

	// move invaders
	for(i = 0; i< Invaders.length; i++){
		Invaders[i].move();
	}
	for(i = 0; i< Invader2s.length; i++){
		Invader2s[i].move();
	}
	for(i = 0; i< Invader3s.length; i++){
		Invader3s[i].move();
	}

	// move bullets
	if(plane.lvl == 0){
		for(i = 0; i < Bullets.length; i++){
			Bullets[i].move();
		}
	}
	if(plane.lvl == 1){
		for(i = 0; i < Bullets.length; i++){
			Bullets[i].move();
		}
		for(i = 0; i < Bullet2s.length; i++){
			Bullet2s[i].move();
		}
	}
	if(plane.lvl == 2){
		for(i = 0; i < Bullets.length; i++){
			Bullets[i].move();
		}
		for(i = 0; i < Bullet2s.length; i++){
			Bullet2s[i].move();
		}
		for(i = 0; i < Bullet3s.length; i++){
			Bullet3s[i].move();
		}
	}
};

// Update game objects
var update = function (elapsed) {

	move(elapsed);
	// lvlup plane
	if(lvlupplane(plane, lvlup)){
		if(plane.lvl == 0 && lvlupReady){
			audioLvlup.play();
			plane.lvl = 1;
			lvlupReady = false;
		}
		if(plane.lvl == 1 && lvlupReady){
			audioLvlup.play();
			plane.lvl = 2;
			lvlupReady = false;
		}
	}

	// change bullet color
	if(lvlupplane(plane, Bcolor) && BcolorReady){
		plane.bulletcolor = Bcolor.color;
		BcolorReady = false;
	}
	
	// Shooting the invaders and change color
	if(plane.lvl == 0){
		checkInvaders(Bullets);
	}
	if(plane.lvl == 1){
		checkInvaders(Bullets);
		checkInvaders(Bullet2s);
	}
	if (plane.lvl ==2) {
		checkInvaders(Bullets);
		checkInvaders(Bullet2s);
		checkInvaders(Bullet3s);
	}

};


var delay = function(elapsed){	
	BulletTimer += elapsed;
	lvlupTimer += elapsed;
	invaderTimer += elapsed;
	BcolorTimer += elapsed;
	if (BulletTimer >= BulletDelay) {
		BulletTimer = 0; 
		if(plane.lvl == 0){
			var bullet = new Bullet(plane.bulletlvl1.x, plane.bulletlvl1.y);
			Bullets.push(bullet);
		}
		if(plane.lvl == 1){
			var bullet = new Bullet(plane.bulletlvl2.x1, plane.bulletlvl2.y1);
			var bullet2 = new Bullet(plane.bulletlvl2.x2, plane.bulletlvl2.y2);
			Bullets.push(bullet);
			Bullet2s.push(bullet2);
		}
		if(plane.lvl == 2){
			var bullet = new Bullet(plane.bulletlvl3.x1, plane.bulletlvl3.y1);
			var bullet2 = new Bullet(plane.bulletlvl3.x2, plane.bulletlvl3.y2);
			var bullet3 = new Bullet(plane.bulletlvl3.x3, plane.bulletlvl3.y3);
			Bullets.push(bullet);
			Bullet2s.push(bullet2);
			Bullet3s.push(bullet3);
		}
	}

	if(lvlupTimer>=lvlupDelay && plane.lvl < 2){
		lvlupTimer = 0;
		lvlupReady = true;
		lvlup.y = -10;
		lvlup.x = Math.random()*(canvas.width - 20);
	}
	if(BcolorTimer>=BcolorDelay){
		BcolorTimer = 0;
		BcolorReady = true;
		Bcolor.y = -10;
		Bcolor.x = Math.random()*(canvas.width - 20);
		bulletColor();
	}
	if(invaderTimer >=invaderDelay){
		invaderTimer = 0;
		var invader1 = new Invader();
		Invaders.push(invader1);
		var invader2 = new Invader2();
		Invader2s.push(invader2);
		var invader3 = new Invader3();
		Invader3s.push(invader3);
	}
};

// Draw everything
var render = function (elapsed) {

	delay(elapsed);
	// Background color changing based on 
	if(black > white || black == white){
		if(black < 126){
			rgb = 125 - black;
			rgb = "" + rgb;
			ctx.fillStyle = "rgb(" + rgb + ", " +rgb + ", " + rgb + ")";
		}
		else{
			ctx.fillStyle = "rgb(0, 0, 0)";
		}
	}
	if(white > black){
		if(white < 127){
			rgb = 125 + white;
			rgb = "" + rgb;
			ctx.fillStyle = "rgb(" + rgb + ", " +rgb + ", " + rgb + ")"; 
		}
		else{
			ctx.fillStyle = "rgb(251, 251, 251)";
		}
	}
	//ctx.fillStyle = "rgb(125, 125, 125)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// plane lvl and draw
	if(plane.lvl == 0){
		planeImage.src = "images/Plane01.png";
	}
	if(plane.lvl == 1){
		planeImage.src = "images/Plane02.png";
		plane.width = 60;
		plane.height = 75;
	}
	if(plane.lvl == 2){
		plane.width = 73;
		plane.height = 75;
		planeImage.src = "images/Plane03.png";
	}
	if(planeReady){
		ctx.drawImage(planeImage, plane.x, plane.y);
	}

	// draw lvlup
	if(lvlupReady){
		ctx.drawImage(lvlupImage, lvlup.x, lvlup.y);
	}

	// draw Bcolor
	if(BcolorReady){
		ctx.drawImage(BcolorImage, Bcolor.x, Bcolor.y);
	}
	// draw all invader
	for(i = 0; i< Invaders.length; i++){
		var invaderImage = new Image();
		if(Invaders[i].ready){
			invaderImage.src = Invaders[i].src;
			ctx.drawImage(invaderImage, Invaders[i].x, Invaders[i].y);
		}
	}
	for(i = 0; i< Invader2s.length; i++){
		var invader2Image = new Image();
		if(Invader2s[i].ready){
			invader2Image.src = Invader2s[i].src;
			ctx.drawImage(invader2Image, Invader2s[i].x, Invader2s[i].y);
		}
	}
	for(i = 0; i< Invader3s.length; i++){
		// invader image
		var invader3Image = new Image();
		if(Invader3s[i].ready){
			invader3Image.src = Invader3s[i].src;
			ctx.drawImage(invader3Image, Invader3s[i].x, Invader3s[i].y);
		}
	}
	//draw all bullets
	// lvl1 plane
	if(plane.lvl == 0){
		for (i = 0; i < Bullets.length; i++) { 
			var bulletsImage = new Image();
	    	if(Bullets[i].ready && ! Bullets[i].shoot){
	    		// change the color of bullet
	    		if(plane.bulletcolor == "black"){
	    			Bullets[i].images = "images/Bullet Black.png"; 
	    			bulletsImage.src = Bullets[i].images;
	    		}
	    		if(plane.bulletcolor== "white"){
	    			Bullets[i].images = "images/Bullet White.png"
	    			bulletsImage.src = Bullets[i].images;
	    		}
				ctx.drawImage(bulletsImage, Bullets[i].x, Bullets[i].y);
				Bullets[i].shot();
			}
			if(Bullets[i].ready && Bullets[i].shoot){
				bulletsImage.src = Bullets[i].images;
				ctx.drawImage(bulletsImage, Bullets[i].x, Bullets[i].y);
			}
		}	
	}
	//lvl2 plane
	if(plane.lvl == 1){
		for (i = 0; i < Bullets.length; i++) { 
			var bulletsImage = new Image();
	    	if(Bullets[i].ready && ! Bullets[i].shoot){
	    		// change the color of bullet
	    		if(plane.bulletcolor == "black"){
	    			Bullets[i].images = "images/Bullet Black.png"; 
	    			bulletsImage.src = Bullets[i].images;
	    		}
	    		if(plane.bulletcolor== "white"){
	    			Bullets[i].images = "images/Bullet White.png"
	    			bulletsImage.src = Bullets[i].images;
	    		}
				ctx.drawImage(bulletsImage, Bullets[i].x, Bullets[i].y);
				Bullets[i].shot();
			}
			if(Bullets[i].ready && Bullets[i].shoot){
				bulletsImage.src = Bullets[i].images;
				ctx.drawImage(bulletsImage, Bullets[i].x, Bullets[i].y);
			}
		}
		for (i = 0; i < Bullet2s.length; i++) { 
			var bulletsImage = new Image();
	    	if(Bullet2s[i].ready && ! Bullet2s[i].shoot){
	    		// change the color of bullet
	    		if(plane.bulletcolor == "black"){
	    			Bullet2s[i].images = "images/Bullet Black.png"; 
	    			bulletsImage.src = Bullet2s[i].images;
	    		}
	    		if(plane.bulletcolor== "white"){
	    			Bullet2s[i].images = "images/Bullet White.png"
	    			bulletsImage.src = Bullet2s[i].images;
	    		}
				ctx.drawImage(bulletsImage, Bullet2s[i].x, Bullet2s[i].y);
				Bullet2s[i].shot();
			}
			if(Bullet2s[i].ready && Bullet2s[i].shoot){
				bulletsImage.src = Bullet2s[i].images;
				ctx.drawImage(bulletsImage, Bullet2s[i].x, Bullet2s[i].y);
			}
		}	
	}
	// lvl3 plane
	if(plane.lvl == 2){
		for (i = 0; i < Bullets.length; i++) { 
			var bulletsImage = new Image();
	    	if(Bullets[i].ready && ! Bullets[i].shoot){
	    		// change the color of bullet
	    		if(plane.bulletcolor == "black"){
	    			Bullets[i].images = "images/Bullet Black.png"; 
	    			bulletsImage.src = Bullets[i].images;
	    		}
	    		if(plane.bulletcolor== "white"){
	    			Bullets[i].images = "images/Bullet White.png"
	    			bulletsImage.src = Bullets[i].images;
	    		}
				ctx.drawImage(bulletsImage, Bullets[i].x, Bullets[i].y);
				Bullets[i].shot();
			}
			if(Bullets[i].ready && Bullets[i].shoot){
				bulletsImage.src = Bullets[i].images;
				ctx.drawImage(bulletsImage, Bullets[i].x, Bullets[i].y);
			}
		}
		for (i = 0; i < Bullet2s.length; i++) { 
			var bulletsImage = new Image();
	    	if(Bullet2s[i].ready && ! Bullet2s[i].shoot){
	    		// change the color of bullet
	    		if(plane.bulletcolor == "black"){
	    			Bullet2s[i].images = "images/Bullet Black.png"; 
	    			bulletsImage.src = Bullet2s[i].images;
	    		}
	    		if(plane.bulletcolor== "white"){
	    			Bullet2s[i].images = "images/Bullet White.png"
	    			bulletsImage.src = Bullet2s[i].images;
	    		}
				ctx.drawImage(bulletsImage, Bullet2s[i].x, Bullet2s[i].y);
				Bullet2s[i].shot();
			}
			if(Bullet2s[i].ready && Bullet2s[i].shoot){
				bulletsImage.src = Bullet2s[i].images;
				ctx.drawImage(bulletsImage, Bullet2s[i].x, Bullet2s[i].y);
			}
		}
		for (i = 0; i < Bullet3s.length; i++) { 
			var bulletsImage = new Image();
	    	if(Bullet3s[i].ready && ! Bullet3s[i].shoot){
	    		// change the color of bullet
	    		if(plane.bulletcolor == "black"){
	    			Bullet3s[i].images = "images/Bullet Black.png"; 
	    			bulletsImage.src = Bullet3s[i].images;
	    		}
	    		if(plane.bulletcolor== "white"){
	    			Bullet3s[i].images = "images/Bullet White.png"
	    			bulletsImage.src = Bullet3s[i].images;
	    		}
				ctx.drawImage(bulletsImage, Bullet3s[i].x, Bullet3s[i].y);
				Bullet3s[i].shot();
			}
			if(Bullet3s[i].ready && Bullet3s[i].shoot){
				bulletsImage.src = Bullet3s[i].images;
				ctx.drawImage(bulletsImage, Bullet3s[i].x, Bullet3s[i].y);
			}
		}		
	}
};

//clean all invader and bullets which are out of bound 
var clean = function(){
	// clean bullets
	for (i = 0; i < Bullets.length; i++){
		if(Bullets[i].y < 0){
			Bullets.splice(i, 1);
		}
	}
		// clean invaders
	for(i = 0; i< Invaders.length; i++){
		if(Invaders[i].y > canvas.height){
			Invaders.splice(i, 1);
		}
	}
	for(i = 0; i< Invader2s.length; i++){
		if(Invader2s[i].y > canvas.height){
			Invader2s.splice(i, 1);
		}
	}
	for(i = 0; i< Invader3s.length; i++){
		if(Invader3s[i].y > canvas.height){
			Invader3s.splice(i, 1);
		}
	}
	// clean lvlup
	if(lvlup.y > canvas.height){
		lvlupReady = false;
	}
};
var gameover = function(){
	if(black > 125){
		ctx.rect(0,0,canvas.width ,canvas.height,false);
		ctx.fillStyle ="black";
		ctx.fill();
		ctx.font = 'bold 24px Calibri';
		ctx.textAlign = 'center';
		ctx.fillStyle ="rgb(44,44,44)";  // <-- Text colour here
		ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2 -15);
		ctx.font = 'bold 20px Calibri';
		ctx.fillText("BLACK", canvas.width/2, canvas.height/2 + 15 );
		ctx.font = 'bold 15px Calibri';
		ctx.fillText("Press S to restart the game", canvas.width/2, canvas.height/2 + 35 );
	}
	if(white > 125){
		ctx.rect(0,0,canvas.width ,canvas.height,false);
		ctx.fillStyle ="white";
		ctx.fill();
		ctx.font = 'bold 24px Calibri';
		ctx.textAlign = 'center';
		ctx.fillStyle ="rgb(222,222,222)";  // <-- Text colour here
		ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2 -15);
		ctx.font = 'bold 20px Calibri';
		ctx.fillText("WHITE", canvas.width/2, canvas.height/2 + 15 );
		ctx.font = 'bold 15px Calibri';
		ctx.fillText("Press S to restart the game", canvas.width/2, canvas.height/2 + 35 );
	}
};

var startScreen = function(){
	ctx.rect(0,0,canvas.width ,canvas.height,false);
		ctx.fillStyle ="white";
		ctx.fill();
		ctx.font = 'bold 24px Calibri';
		ctx.textAlign = 'center';
		ctx.fillStyle ="black";  // <-- Text colour here
		ctx.fillText("START", canvas.width/2, canvas.height/2 -15);
		ctx.font = 'bold 10px Calibri';
		ctx.fillText("press S to Start the game", canvas.width/2, canvas.height/2 + 15 );
};

var pauseScreen = function(){
	ctx.rect(0,0,canvas.width ,canvas.height,false);
		ctx.fillStyle ="white";
		ctx.fill();
		ctx.font = 'bold 24px Calibri';
		ctx.textAlign = 'center';
		ctx.fillStyle ="black";  // <-- Text colour here
		ctx.fillText("PAUSE", canvas.width/2, canvas.height/2 -15);
};

var restart = function(){
	// reset background
	black = 0;
	white = 0;
	rgb = 0;
	// reset Invaders
	Invaders = [];
	Invader2s = [];
	Invader3s = [];
	//reset Bullets
	Bullets  = [];
	Bullet2s = [];
	Bullet3s = [];
	// reset lvlup
	lvlupTimer = 0;
	lvlupReady = false;
	BcolorTimer = 0;
	BcolorReady = false;
	// reset plane
	plane.width = 50;
	plane.height = 46;
	plane.bulletcolor = "";
	plane.lvl = 0;
	plane.x = canvas.width/2;
	plane.y = canvas.height/2;
	plane.bulletlvl1.x  = canvas.width/2 + 15;
	plane.bulletlvl1.y  = canvas.height/2 - 20;
	plane.bulletlvl2.x1 = canvas.width/2 - 12;
	plane.bulletlvl2.y1 = canvas.height/2;
	plane.bulletlvl2.x2 = canvas.width/2 + 52;
	plane.bulletlvl2.y2 = canvas.height/2;
	plane.bulletlvl3.x1 = canvas.width/2-12;
	plane.bulletlvl3.y1 = canvas.height/2 - 20;
	plane.bulletlvl3.x2 = canvas.width/2 + 26;
	plane.bulletlvl3.y2 = canvas.height/2 - 20;
	plane.bulletlvl3.x3 = canvas.width/2 +66;
	plane.bulletlvl3.y3 = canvas.height/2 - 20;
}

// background audio
var gameAudio = function(){
	if(!gameovered){
		audioBackground.play();
	}
	else{
		audioBackground.pause();
	}
};

// game logic
var game = function(elapsed){
	gameAudio();
	//start game
	if(!gamestarted){
		startScreen();
	}
	else if(gameovered && gamestarted){
		if(!audioGameoverPlayed){
			audioGameover.play();
			audioGameoverPlayed = true;
		}
		restart();
	}
	else{
		handlePause();
		if(!gamepaused){
			handleInput();
			update(elapsed);
			clean();
			if(white < 126 && black < 126){
				render(elapsed);
			}
			else{
				 gameovered = true;
				 gameover();
			}
		}
		else{
			pauseScreen();
		}
	}	
}

// Main game loop
var main = function () {

	// Calculate time since last frame
	var now = Date.now();
	var delta = (now - last);
	last = now;
	game(delta);
};

// Start the main game loop!
var last = Date.now();
setInterval(main, 1);