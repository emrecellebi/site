/**
	https://www.youtube.com/watch?v=hotMX-pqjkQ
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var particleArray;

/***************************** Class *****************************/
// create constructor function
function Particle(x, y, directionX, directionY, size, color)
{
	this.x = x;
	this.y = y;
	this.directionX = directionX;
	this.directionY = directionY;
	this.size = size;
	this.color = color;
}

// add draw method to particle prototype
Particle.prototype.draw = function()
{
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.closePath();
}

// add update method to particle prototype
Particle.prototype.update = function()
{
	this.draw();
	
	if(this.x + this.size > WIDTH || this.x - this.size < 0)
		this.directionX = -this.directionX;
	
	if(this.y + this.size > HEIGHT || this.y - this.size < 0)
		this.directionY = -this.directionY;
	
	this.x += this.directionX;
	this.y += this.directionY;
}

/***************************** Functions *****************************/
// create particle array
function init()
{
	particleArray = [];
	for(var i = 0; i < 500; i++)
	{
		var size = Math.random() * 10;
		var x = Math.random() * (WIDTH - size * 2);
		var y = Math.random() * (HEIGHT - size * 2);
		var directionX = (Math.random() * 1) - .5;
		var directionY = (Math.random() * 1) - .5;
		var color = 'black';
		
		particleArray.push(new Particle(x, y, directionX, directionY, size, color));
	}
}

// animate loop
function animate()
{
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	for(var i = 0; i < particleArray.length; i++)
	{
		particleArray[i].update();
	}
}



/***************************** Events *****************************/
addEventListener('resize', () => {
	WIDTH = canvas.width = window.innerWidth;
	HEIGHT = canvas.height = window.innerHeight;
	
	init();
});



/***************************** Started *****************************/
init();
animate();