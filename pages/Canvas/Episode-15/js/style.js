/**
	https://www.youtube.com/watch?v=kaIT3T4a5YU
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

const mouse = {
	x: WIDTH / 2,
	y: HEIGHT / 2
};

const center = {
	x: WIDTH / 2,
	y: HEIGHT / 2
};

var angle = 0;

addEventListener('mousemove', (event) => {
	const vec2 = {
		x: mouse.x = event.clientX - WIDTH / 2,
		y: mouse.y = event.clientY - HEIGHT / 2,
		duration: 1
	};
	gsap.to(mouse, vec2);
	
	angle = Math.atan2(mouse.y, mouse.x);
});

addEventListener('resize', () => {
	WIDTH = canvas.width = window.innerWidth;
	HEIGHT = canvas.height = window.innerHeight;
	
	init();
});

class Particle
{
	constructor(x, y, radius, color, distFromCenter)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.distFromCenter = distFromCenter;
	}
	
	draw()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	
	update(timer)
	{
		const {cos, sin} = Math;
		
		this.draw();
		// this.x = center.x + this.distFromCenter * cos(angle);		/// default, default 2, default 3
		// this.y = center.y + this.distFromCenter * sin(angle);		/// default, default 2, default 3
		
		this.x = center.x + this.distFromCenter * cos(-angle) * sin(timer + this.distFromCenter) * cos(timer + this.distFromCenter);		/// default 4
		this.y = center.y + this.distFromCenter * sin(-angle) * cos(timer + this.distFromCenter) * cos(timer);							/// default 4
	}
}

var particles;
function init()
{
	particles = [];
	
	const particleCount = 300;
	const hueIncrement = 360 / particleCount;
	const baseRadius = 3;
	const radiusIncrement = baseRadius / particleCount;
	
	for(var i = 0; i < particleCount; i++)
	{
		const x = WIDTH / 2 + i * Math.cos(Math.PI);
		const y = HEIGHT / 2 + i * Math.sin(-Math.PI);
		// particles.push(new Particle(x, y, 5, `hsl(${hueIncrement * i}, 50%, 50%)`, i));									/// default
		// particles.push(new Particle(x, y, radiusIncrement * i, `hsl(${hueIncrement * i}, 50%, 50%)`, i));				/// default 2
		// particles.push(new Particle(x, y, baseRadius - radiusIncrement * i, `hsl(${hueIncrement * i}, 50%, 50%)`, i));	/// default 3
		particles.push(new Particle(x, y, baseRadius, `hsl(${hueIncrement * i}, 50%, 50%)`, i));							/// default 4
	}
}

var timer = 0;
function animate()
{
	requestAnimationFrame(animate);
	ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	
	particles.forEach((particle) => {
		particle.update(timer);
	});
	
	timer += 0.001;
}

init();
animate();