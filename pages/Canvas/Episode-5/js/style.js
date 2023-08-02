/**
	https://www.youtube.com/watch?v=3b7FyIxWW94
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var mouse = {
	x: undefined,
	y: undefined
}

var colors = [
	"#2185c5",
	"#7ecefd",
	"#fff6e5",
	"#ff7f66",
];

var gravity = 1;
var friction = 0.59;

window.addEventListener("mousemove", function(event){
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

window.addEventListener("resize", function(event){
	this.WIDTH = canvas.width = window.innerWidth;
	this.HEIGHT = canvas.height = window.innerHeight;
	
	init();
});

window.addEventListener("click", function(event){
	init();
});

/// Utility Function
function randomFromRange(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor()
{
	return colors[Math.floor(Math.random() * colors.length)]
}

/// Object
function Ball(x, y, dx, dy, radius, color)
{
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius
	this.color = color;
	
	this.draw = function()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
	
	this.update = function()
	{
		if(this.y + this.radius + this.dy > HEIGHT)
			this.dy = -this.dy * friction;
		else
			this.dy += gravity;
		
		if(this.x + this.radius + this.dx > WIDTH || this.x - this.radius < 0)
			this.dx = -this.dx;
		
		this.x += this.dx;
		this.y += this.dy;
		
		this.draw();
	}
}

/// Implementation
var balls = [];
function init()
{
	balls = [];
	for(var i = 0; i < 400; i++)
	{
		var radius = randomFromRange(8, 20);
		var x = randomFromRange(radius, WIDTH - radius);
		var y = randomFromRange(0, HEIGHT - radius);
		var dx = randomFromRange(-2, 2);
		var dy = randomFromRange(-2, 2);
		var color = randomColor();
		balls.push(new Ball(x, y, dx, dy, radius, color));
	}
	
}

/// Animation Loop
function animate()
{
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	for(var i = 0; i < balls.length; i++)
		balls[i].update();
	
	requestAnimationFrame(animate);
}

init();
animate();