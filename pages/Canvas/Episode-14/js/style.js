/**
	https://www.youtube.com/watch?v=R_CnWF3a_ks
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

const mouse = {
	x: WIDTH / 2,
	y: HEIGHT / 2
};

addEventListener('resize', () => {
	WIDTH = canvas.width = window.innerWidth;
	HEIGHT = canvas.height = window.innerHeight;
	
	init();
});

const gravity = 0.005;
const friction = 0.99;

class Particle
{
	constructor(x, y, radius, color, velocity)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
		this.alpha = 1;
	}
	
	draw()
	{
		ctx.save();
		ctx.globalAlpha = this.alpha;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
	
	update()
	{
		this.draw();
		this.velocity.x *= friction;
		this.velocity.y *= friction;
		this.velocity.y += gravity;
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.alpha -= 0.005;
	}
}

var particles;
function init()
{
	particles = [];
}

function animate()
{
	requestAnimationFrame(animate);
	ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	
	particles.forEach((particle, i) => {
		if(particle.alpha > 0)
			particle.update();
		else
			particles.splice(i, 1);
	});
}

init();
animate();

addEventListener('click', () => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	
	const particleCount = 400;
	const angleIncrement = Math.PI * 2 / particleCount;
	const power = 30;
	
	for(var i = 0; i < particleCount; i++)
	{
		const velocity = {
			x: Math.cos(angleIncrement * i) * Math.random() * power,
			y: Math.sin(angleIncrement * i) * Math.random() * power
		};
		particles.push(new Particle(mouse.x, mouse.y, 3, `hsl(${Math.random() * 360}, 50%, 50%)`, velocity));
	}
});