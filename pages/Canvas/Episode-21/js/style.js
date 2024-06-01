/**
	https://www.youtube.com/watch?v=GVuU25pGaYo
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

/// Load images
const images = {};
images.player = new Image();
images.player.src = "res/character.png";
const characterActions = ['up', 'top right', 'right', 'down right', 'down', 'jump'];

const playerWidth = 103.0625;
const playerHeight = 113.125;
var playerFrameX = 3;
var playerFrameY = 3;
var playerX = 0;
var playerY = 0;
var playerSpeed = 6;

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH)
{
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate()
{
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	drawSprite(images.player, playerWidth * playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidth, playerHeight);
	
	/// Animate Sprite
	if(playerFrameX < 13) playerFrameX++; else playerFrameX = 3;
	
	/// Move player
	if(playerX < WIDTH + playerWidth) playerX += playerSpeed; else playerX = 0 - playerWidth;
}

window.onload = setInterval(animate, 1000 / 30);

window.addEventListener('resize', () => {
	WIDTH = canvas.width = window.innerWidth;
	HEIGHT = canvas.height = window.innerHeight;
});