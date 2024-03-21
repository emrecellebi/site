/**
	https://www.youtube.com/watch?v=
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

addEventListener('resize', () => {
	WIDTH = canvas.width = window.innerWidth;
	HEIGHT = canvas.height = window.innerHeight;
	
	init();
});

class Objects
{
	constructor(x, y, radius, color)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
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

var objects;
function init()
{
	objects = [];
	for(var i = 0; i < 400; i++)
	{
		// objects.push(new Objects(0, 0, 0, ''));
	}
}

function animate()
{
	requestAnimationFrame(animate);
	
	objects.forEach((object) => {
		object.update();
	});
}

init();
animate();