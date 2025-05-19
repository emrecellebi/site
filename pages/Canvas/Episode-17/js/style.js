/**
	https://www.youtube.com/watch?v=4q2vvZn5aoo
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

const gravity = 1.5;
const keys = {
	right: {
		pressed: false
	},
	left: {
		pressed: false
	},
	up: {
		pressed: false
	},
	down: {
		pressed: false
	}
};
var scrollOffset = 0;

var imgPlatform = createImage('./img/platform.png', 580, 125);
var imgBackground = createImage('./img/background.png', 11643, 732);
var imgHills = createImage('./img/hills.png', 7545, 529);
var imgPlatformSmallTall = createImage('./img/platformSmallTall.png', 291, 227);
var imgPlayerStandLeft = createImage('./img/spriteStandLeft.png', 10620, 400);
var imgPlayerStandRight = createImage('./img/spriteStandRight.png', 10620, 400);
var imgPlayerRunLeft = createImage('./img/spriteRunLeft.png', 10230, 400);
var imgPlayerRunRight = createImage('./img/spriteRunRight.png', 10230, 400);
var genericObjects = [];
var platforms = [];
var currentKey;

function createImage(src, w, h)
{
	const img = new Image(w, h);
	img.src = src;
	return img;
}

/***************************** Class *****************************/
class Player
{
	constructor()
	{
		this.speed = 10;
		this.position = {
			x: 100,
			y: 100
		};
		this.velocity = {
			x: 0,
			y: 0
		};
		this.width = 66;
		this.height = 150;
		this.img = imgPlayerStandRight;
		this.frames = 0;
		this.sprites = {
			stand: {
				right: imgPlayerStandRight,
				left: imgPlayerStandLeft,
				cropWidth: 177,
				width: 66
			},
			run: {
				right: imgPlayerRunRight,
				left: imgPlayerRunLeft,
				cropWidth: 340,
				width: 127.875
			}
		};
		this.currentSprite = this.sprites.stand.right;
		this.currentCropWidth = 177;
	}
	
	draw()
	{
		// ctx.fillStyle = 'red';
		// ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
		ctx.drawImage(this.currentSprite, this.currentCropWidth * this.frames, 0, this.currentCropWidth, 400, this.position.x, this.position.y, this.width, this.height);
	}
	
	update()
	{
		this.frames++;
		if(this.frames > 59 && (this.currentSprite == this.sprites.stand.right || this.currentSprite == this.sprites.stand.left))
			this.frames = 0;
		else if(this.frames > 29 && (this.currentSprite == this.sprites.run.right || this.currentSprite == this.sprites.run.left))
			this.frames = 0;
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		
		/// Player Gravity
		if(this.position.y + this.height + this.velocity.y <= HEIGHT)
			this.velocity.y += gravity;
		// else
			// this.velocity.y = 0;
	}
}

class Platform
{
	constructor({x, y, img})
	{
		this.position = {x, y};
		this.img = img;
		this.width = img.width;
		this.height = img.height;
	}
	
	draw()
	{
		ctx.drawImage(this.img, this.position.x, this.position.y);
	}
	
	update()
	{
		this.draw();
	}
}

class GenericObject
{
	constructor({x, y, img})
	{
		this.position = {x, y};
		this.img = img;
		this.width = img.width;
		this.height = img.height;
	}
	
	draw()
	{
		ctx.drawImage(this.img, this.position.x, this.position.y);
	}
	
	update()
	{
		this.draw();
	}
}

/***************************** Functions *****************************/
var player = new Player();

function init()
{
	player = new Player();
	platforms = [
		new Platform({x: imgPlatform.width * 4 + 300 - 2 + imgPlatform.width - imgPlatformSmallTall.width, y: 375, img: imgPlatformSmallTall}),
		new Platform({x: -1, y: 600, img: imgPlatform}),
		new Platform({x: imgPlatform.width - 3, y: 600, img: imgPlatform}),
		new Platform({x: imgPlatform.width * 2 + 100, y: 600, img: imgPlatform}),
		new Platform({x: imgPlatform.width * 3 + 300, y: 600, img: imgPlatform}),
		new Platform({x: imgPlatform.width * 4 + 300 - 2, y: 600, img: imgPlatform}),
		new Platform({x: imgPlatform.width * 5 + 700 - 2, y: 600, img: imgPlatform})
	]
	
	genericObjects = [
		new GenericObject({x: -1, y: -1, img: imgBackground}),
		new GenericObject({x: -1, y: 70, img: imgHills})
	];
	
	scrollOffset = 0;
}

function animate()
{
	requestAnimationFrame(animate);
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	
	genericObjects.forEach(genericObject => {
		genericObject.update();
	});
	
	platforms.forEach(platform => {
		platform.update();
	});
	player.update();
	
	if(keys.right.pressed && player.position.x < 400)
		player.velocity.x = player.speed;
	else if((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset == 0 && player.position.x > 0)
		player.velocity.x = -player.speed;
	else
	{
		player.velocity.x = 0;
		
		/// Scroll background 
		if(keys.right.pressed)
		{
			scrollOffset += player.speed;
			platforms.forEach(platform => {
				platform.position.x -= player.speed * 0.66;
			});
			
			genericObjects.forEach(genericObject => {
				genericObject.position.x -= player.speed * 0.66;
			});
		}
		
		if(keys.left.pressed && scrollOffset > 0)
		{
			scrollOffset -= player.speed;
			platforms.forEach(platform => {
				platform.position.x += player.speed * 0.66;
			});
			
			genericObjects.forEach(genericObject => {
				genericObject.position.x += player.speed * 0.66;
			});
		}
	}
	
	/// Playform Collision Detection
	platforms.forEach(platform => {
		if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y &&
		   player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width)
		{
			player.velocity.y = 0;
		}
	});
	
	if(keys.right.pressed && currentKey == "right" && player.currentSprite != player.sprites.run.right)
	{
		player.frames = 1;
		player.currentSprite = player.sprites.run.right;
		player.currentCropWidth = player.sprites.run.cropWidth;
		player.width = player.sprites.run.width;
	}
	if(keys.left.pressed && currentKey == "left" && player.currentSprite != player.sprites.run.left)
	{
		player.frames = 1;
		player.currentSprite = player.sprites.run.left;
		player.currentCropWidth = player.sprites.run.cropWidth;
		player.width = player.sprites.run.width;
	}
	if(!keys.right.pressed && currentKey == "right" && player.currentSprite != player.sprites.stand.right)
	{
		player.frames = 1;
		player.currentSprite = player.sprites.stand.right;
		player.currentCropWidth = player.sprites.stand.cropWidth;
		player.width = player.sprites.stand.width;
	}
	if(!keys.left.pressed && currentKey == "left" && player.currentSprite != player.sprites.stand.left)
	{
		player.frames = 1;
		player.currentSprite = player.sprites.stand.left;
		player.currentCropWidth = player.sprites.stand.cropWidth;
		player.width = player.sprites.stand.width;
	}
	
	if(scrollOffset > 2000)
	{
		console.log("You Win");
	}
	
	if(player.position.y > HEIGHT)
	{
		init();
	}
}

/***************************** Events *****************************/
addEventListener('keydown', (event) => {
	const keyCode = event.keyCode;
	switch(keyCode)
	{
		case 65: /// Key: A -> Left
			keys.left.pressed = true;
			currentKey = "left";
		break;
		
		case 83: /// Key: S -> Down
			
		break;
		
		case 68: /// Key: D -> Right
			keys.right.pressed = true;
			currentKey = "right";
		break;
		
		case 87: /// Key: W -> Up
			player.velocity.y -= 30;
		break;
	}
});

addEventListener('keyup', (event) => {
	const keyCode = event.keyCode;
	
	switch(keyCode)
	{
		case 65: /// Key: A -> Left
			keys.left.pressed = false;
			currentKey = "left";
		break;
		
		case 83: /// Key: S	-> Down
			
		break;
		
		case 68: /// Key: D	-> Right
			keys.right.pressed = false;
			currentKey = "right";
		break;
		
		case 87: /// Key: W	-> Up
			// player.velocity.y -= 20;
		break;
	}
});

addEventListener('mousemove', (event) => {
	// mouse.x = event.clientX;
	// mouse.y = event.clientY;
});

addEventListener('resize', () => {
	WIDTH = canvas.width = window.innerWidth;
	HEIGHT = canvas.height = window.innerHeight;
	
	// init();
});

/***************************** Started *****************************/
init();
animate();