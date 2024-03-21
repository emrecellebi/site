/**
	https://www.youtube.com/watch?v=M4WzhdQPyH0
**/

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;

class Circle
{
	constructor(x, y, radius, color, offset)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.offset = offset;
	}
	
	draw()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	
	update()
	{
		this.draw();
	}
}

const circles = [];
for(var i = 0; i < 100; i++)
{
	circles.push(new Circle(-30, -30, 10, `hsl(${Math.random() * 255}, 100%, 50%)`, i * 0.01));
}

var time = 0;

function animate()
{
	requestAnimationFrame(animate);
	ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	
	circles.forEach((circle) => {
		circle.draw();
		circle.x = noise(time + circle.offset + 20) * WIDTH;
		circle.y = noise(time + circle.offset) * HEIGHT;
	});
	
	time += 0.005;
}

animate();