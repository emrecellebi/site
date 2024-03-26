/**
	https://www.youtube.com/watch?v=4q2vvZn5aoo
**/


var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = 1024;
var HEIGHT = canvas.height = 576;
var ctx = canvas.getContext("2d");

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

const mouse = {
	x: WIDTH / 2,
	y: HEIGHT / 2
};

const gravity = 1.5;

/***************************** Class *****************************/
class Player
{
	constructor()
	{
		this.position = {
			x: 100,
			y: 100
		};
		this.velocity = {
			x: 0,
			y: 0
		};
		this.width = 30;
		this.height = 30;
	}
	
	draw()
	{
		ctx.fillStyle = 'red';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
	
	update()
	{
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		
		if(this.position.y + this.height + this.velocity.y <= HEIGHT)
			this.velocity.y += gravity;
		else
			this.velocity.y = 0;
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

function createImage(src, w, h)
{
	const img = new Image(w, h);
	img.src = src;
	return img;
}

const platformImg = createImage('./img/platform.png', 580, 125);
const player = new Player();
const platforms = [
	new Platform({x: -1, y: 470, img: platformImg}),
	new Platform({x: platformImg.width - 3, y: 470, img: platformImg})
];
const genericObjects = [
	new GenericObject({x: -1, y: -1, img: createImage('./img/background.png', 11643, 732)}),
	new GenericObject({x: -1, y: -1, img: createImage('./img/hills.png', 7545, 529)})
];
var scrollOffset = 0;


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

function init()
{
	
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
		player.velocity.x = 5;
	else if(keys.left.pressed && player.position.x > 100)
		player.velocity.x = -5;
	else
	{
		player.velocity.x = 0;
		
		/// Scroll background: Platformları kaydırarak scroll özeliğini kazandırmış oldu
		if(keys.right.pressed)
		{
			scrollOffset += 5;
			platforms.forEach(platform => {
				platform.position.x -= 5;
			});
			genericObjects.forEach(genericObject => {
				genericObject.position.x -= 3;
			});
		}
		else if(keys.left.pressed)
		{
			scrollOffset -= 5;
			platforms.forEach(platform => {
				platform.position.x += 5;
			});
			genericObjects.forEach(genericObject => {
				genericObject.position.x += 3;
			});
		}
	}
	
	/// Platform Collision Detection
	platforms.forEach(platform => {
		if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y &&
		   player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width)
	   {
		   player.velocity.y = 0;
	   }
	});
	
	if(scrollOffset > 2000)
	{
		console.log("You Win");
	}
}



/***************************** Events *****************************/
addEventListener('keydown', (event) => {
	const keyCode = event.keyCode;
	
	switch(keyCode)
	{
		case 65:		/// Key: A		Left
			keys.left.pressed = true;
		break;
		
		case 83:		/// Key: S		Down
			
		break;
		
		case 68:		/// Key: D		Right
			keys.right.pressed = true;
		break;
		
		case 87:		/// Key: W		Up
			player.velocity.y -= 20;
		break;
	}
});

addEventListener('keyup', (event) => {
	const keyCode = event.keyCode;
	
	switch(keyCode)
	{
		case 65:		/// Key: A		Left
			keys.left.pressed = false;
		break;
		
		case 83:		/// Key: S		Down
			
		break;
		
		case 68:		/// Key: D		Right
			keys.right.pressed = false;
		break;
		
		case 87:		/// Key: W		Up
			player.velocity.y -= 20;
		break;
	}
});

addEventListener('mousemove', (event) => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener('resize', () => {
	WIDTH = canvas.width = window.innerWidth;
	HEIGHT = canvas.height = window.innerHeight;
	
	init();
});


/***************************** Started *****************************/
init();
animate();