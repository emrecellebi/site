/**
	https://www.youtube.com/watch?v=raXW5J1Te7Y
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var mouse = {
	x: 10,
	y: 10
}

var colors = [
	"#00bdff",
	"#4d39ce",
	"#088eff",
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

function distance(x1, y1, x2, y2)
{
	var xDist = x2 - x1;
	var yDist = y2 - y1;
	return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

/// Object
function Particle(x, y, radius, color)
{
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.radians = Math.random() * Math.PI * 2;
	this.velocity = 0.05;
	this.distanceFromCenter = randomFromRange(50, 120);
	this.lastMouse = {x: x, y: y};
	
	this.update = function()
	{
		var lastPoint = {x: this.x, y: this.y};
		
		/// Move points over
		this.radians += this.velocity;
		
		/// Drag effect
		this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
		this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
		
		/// Circular Motion
		this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
		this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
		this.draw(lastPoint);
	}
	
	this.draw = lastPoint =>
	{
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.radius;
		ctx.moveTo(lastPoint.x, lastPoint.y);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
		ctx.closePath();
	}
	
}



/// Implementation
var particles;
function init()
{
	particles = [];
	
	for(var i = 0; i < 50; i++)
	{
		var radius = (Math.random() * 2) + 1;
		particles.push(new Particle(WIDTH / 2, HEIGHT / 2, radius, randomColor()));
	}
}

/// Animation Loop
function animate()
{
	ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	
	particles.forEach(particle => {
		particle.update();
	});
	
	requestAnimationFrame(animate);
}

init();
animate();