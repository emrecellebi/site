/**
	https://www.youtube.com/watch?v=D_BPilf_F8k
**/

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

var mouseDown = false;
addEventListener('mousedown', () => {
	mouseDown = true;
});

addEventListener('mouseup', () => {
	mouseDown = false;
});

addEventListener('resize', () => {
	WIDTH = canvas.width = window.innerWidth;
	HEIGHT = canvas.height = window.innerHeight;
	
	init();
});

class Particle
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
		ctx.shadowColor = this.color;
		ctx.shadowBlur = 15;
		ctx.fill();
		ctx.closePath();
	}
	
	update()
	{
		this.draw();
	}
}

var particles;
function init()
{
	particles = [];
	for(var i = 0; i < 500; i++)
	{
		const canvasWidth = WIDTH + 300;
		const canvasHeight = HEIGHT + 600;
		const x = Math.random() * canvasWidth - canvasWidth / 2;
		const y = Math.random() * canvasHeight - canvasHeight / 2;
		const radius = 2 * Math.random();
		const color = colors[Math.floor(Math.random() * colors.length)];
		particles.push(new Particle(x, y, radius, color));
	}
}

var radians = 0;
var alpha = 1;
function animate()
{
	requestAnimationFrame(animate);
	ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`;
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	
	ctx.save();
	ctx.translate(WIDTH / 2, HEIGHT / 2);
	ctx.rotate(radians);
	particles.forEach((particle) => {
		particle.update();
	});
	ctx.restore();
	
	radians += 0.008;
	
	if(mouseDown && alpha >= 0.03)
		alpha -= 0.01;
	else if(!mouseDown && alpha < 1)
		alpha += 0.01;
}

init();
animate();