// CANVAS CRIAÇÃO
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// IMAGEM FUNDO
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// mario image
var marioReady = false;
var marioImage = new Image();
marioImage.onload = function () {
	marioReady = true;
};
marioImage.src = "images/mario.png";

// Monstro image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster2.png";

// objetos do jogo
var mario = {
	speed: 256 // movimento por segundo em pixel
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	mario.x = canvas.width / 2;
	mario.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		mario.y -= mario.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		mario.y += mario.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		mario.x -= mario.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		mario.x += mario.speed * modifier;
	}

	// Are they touching?
	if (
		mario.x <= (monster.x + 32)
		&& monster.x <= (mario.x + 32)
		&& mario.y <= (monster.y + 32)
		&& monster.y <= (mario.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (marioReady) {
		ctx.drawImage(marioImage, mario.x, mario.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(" Pegue o monstro.                      Score: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
