/**
	https://www.youtube.com/watch?v=5MUsKgU6i0I
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

const mouse = {
	x: WIDTH / 2,
	y: HEIGHT / 2
};

addEventListener('mousemove', (event) => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener('resize', () => {
	WIDTH = canvas.width = window.innerWidth;
	HEIGHT = canvas.height = window.innerHeight;
	
	init();
});

class Particle
{
	constructor(x, y, radius, color, velocity)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
		this.ttl = 1000;
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
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.ttl--;
	}
}

var particles;
function init()
{
	particles = [];
}

var hue = 0;
var hueRadians = 0;
function generateRing()
{
	setTimeout(generateRing, 200);
	hue = Math.sin(hueRadians);
	
	const particleCount = 30;
	
	for(var i = 0; i < particleCount; i++)
	{
		const radian = (Math.PI * 2) / particleCount;
		const x = mouse.x;
		const y = mouse.y;
		const velocity = {
			x: Math.cos(radian * i) * 3,
			y: Math.sin(radian * i) * 3
		};
		particles.push(new Particle(x, y, 5, `hsl(${Math.abs(hue * 360)}, 50%, 50%)`, velocity));
	}
	
	hueRadians += 0.01;
}

function animate()
{
	requestAnimationFrame(animate);
	ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	
	particles.forEach((particle, i) => {
		if(particle.ttl < 0)
			particles.splice(i, 1);
		else
			particle.update();
	});
}

init();
animate();
generateRing();