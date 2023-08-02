/**
	https://www.youtube.com/watch?v=vxljFhP2krI
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var mouse = {
	x: undefined,
	y: undefined
}

var colorArray = [
	"#2c3e50",
	"#e74c3c",
	"#ecf0f1",
	"#3498db",
	"#2980b9",
];

var maxRadius = 40;

window.addEventListener("mousemove", function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener("resize", function(event){
	this.WIDTH = canvas.width = window.innerWidth;
	this.HEIGHT = canvas.height = window.innerHeight;
	
	init();
});

function Circle(x, y, dx, dy, radius)
{
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius
	this.minRadius = radius
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	
	this.draw = function()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	
	this.update = function()
	{
		if(this.x + this.radius > WIDTH || this.x - this.radius < 0)
		{
			this.dx = -this.dx;
		}
		
		if(this.y + this.radius > HEIGHT || this.y - this.radius < 0)
		{
			this.dy = -this.dy;
		}
		
		this.x += this.dx;
		this.y += this.dy;
		
		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50)
		{
			if(this.radius < maxRadius)
				this.radius += 1;
		}
		else if(this.radius > this.minRadius)
			this.radius -= 1;
		
		this.draw();
	}
}

var circleArray = [];

function init()
{
	circleArray = [];
	for(var i = 0; i < 800; i++)
	{
		var radius = Math.random() * 3 + 1;
		var x = Math.random() * (WIDTH - radius * 2) + radius;
		var y = Math.random() * (HEIGHT - radius * 2) + radius;
		var dx = (Math.random() - 0.5);
		var dy = (Math.random() - 0.5);
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function animate()
{
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	for(var i = 0; i < circleArray.length; i++)
		circleArray[i].update();

	requestAnimationFrame(animate);
}

init();
animate();