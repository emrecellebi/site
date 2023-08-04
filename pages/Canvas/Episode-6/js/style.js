/**
	https://www.youtube.com/watch?v=3b7FyIxWW94
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
function Circle(x, y, radius, color)
{
	this.x = x;
	this.y = y;
	this.radius = radius
	this.color = color;
	
	this.draw = function()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	
	this.update = function()
	{
		this.draw();
	}
}

function getDistance(x1, y1, x2, y2)
{
	var xDistance = x2 - x1;
	var yDistance = y2 - y1;
	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

/// Implementation
var circle1;
var circle2;
function init()
{
	circle1 = new Circle(300, 300, 100, "black");
	circle2 = new Circle(10, 10, 30, "red");
}

/// Animation Loop
function animate()
{
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	circle1.update();
	circle2.x = mouse.x;
	circle2.y = mouse.y;
	circle2.update();
	
	if(getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius)
	{
		circle1.color = "red";
	}
	else 
	{
		circle1.color = "black";
	}
	
	console.log(getDistance(circle1.x, circle1.y, circle2.x, circle2.y));
	
	requestAnimationFrame(animate);
}

init();
animate();