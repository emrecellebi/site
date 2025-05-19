/**
	https://www.youtube.com/watch?v=yq2au9EfeRQ
**/

var canvas = document.querySelector("canvas");
const WIDTH = canvas.width = window.innerWidth;
const HEIGHT = canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

function Circle(x, y, dx, dy, radius)
{
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius
	
	this.draw = function()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.strokeStyle = "blue";
		ctx.stroke();
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
		
		this.draw();
	}
}

var circleArray = [];

for(var i = 0; i < 100; i++)
{
	var radius = 30;
	var x = Math.random() * (WIDTH - radius * 2) + radius;
	var y = Math.random() * (HEIGHT - radius * 2) + radius;
	var dx = (Math.random() - 0.5) * 8;
	var dy = (Math.random() - 0.5) * 8;
	circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate()
{
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	for(var i = 0; i < circleArray.length; i++)
		circleArray[i].update();

	requestAnimationFrame(animate);
}

animate();