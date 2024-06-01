/**
	https://www.youtube.com/watch?v=d620nV6bp0A
**/

var canvas = document.getElementById("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var mouse = {
	x: null,
	y: null,
	radius: (WIDTH / 80) * (HEIGHT / 80)
};



/***************************** Class *****************************/
class Particle
{
	constructor(x, y, directionX, directionY, size, color)
	{
		this.x = x;
		this.y = y;
		this.directionX = directionX;
		this.directionY = directionY;
		this.size = size;
		this.color = color;
	}
	
	draw()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	
	update()
	{
		if(this.x > WIDTH || this.x < 0)
			this.directionX = -this.directionX;
		
		if(this.y > HEIGHT || this.y < 0)
			this.directionY = -this.directionY;
	
		/// check collision detection
		var dx = mouse.x - this.x;
		var dy = mouse.y - this.y;
		var distance = Math.sqrt(dx * dx + dy * dy);
		if(distance < mouse.radius + this.size)
		{
			if(mouse.x < this.x && this.x < WIDTH - this.size * 10)
				this.x += 10;
			
			if(mouse.x > this.x && this.x > this.size * 10)
				this.x -= 10;
			
			if(mouse.y < this.y && this.y < HEIGHT - this.size * 10)
				this.x += 10;
			
			if(mouse.y > this.y && this.y > this.size * 10)
				this.x -= 10;
		}
		this.x += this.directionX;
		this.y += this.directionY;
		this.draw();
	}
}



/***************************** Functions *****************************/
var particles;
function init()
{
	particles = [];
	var numberOfParticles = (HEIGHT * WIDTH) / 9000;
	for(var i = 0; i < numberOfParticles * 2; i++)
	{
		var size = (Math.random() * 5) + 1;
		var x = (Math.random() * ((WIDTH - size * 2) - (size * 2)) + size * 2);
		var y = (Math.random() * ((HEIGHT - size * 2) - (size * 2)) + size * 2);
		var directionX = (Math.random() * 5) - 2.5;
		var directionY = (Math.random() * 5) - 2.5;
		var color = '#8c5523';
		
		particles.push(new Particle(x, y, directionX, directionY, size, color));
	}
}

function connect()
{
	var opacity = 1;
	for(let a = 0; a < particles.length; a++)
	{
		for(let b = a; b < particles.length; b++)
		{
			let distance = (( particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y)); 
			if(distance < (WIDTH / 7) * (HEIGHT / 7))
			{
				opacity = 1 - (distance / 20000);
				ctx.strokeStyle = `rgba(140, 85, 31, ${opacity})`;
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(particles[a].x, particles[a].y); ctx.lineTo(particles[b].x, particles[b].y);
				ctx.stroke();
			}
		}
	}
}

function animate()
{
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	for(var i = 0; i < particles.length; i++)
	{
		particles[i].update();
	}
	
	connect();
}






/***************************** Events *****************************/
addEventListener('mousemove', (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
});

addEventListener('resize', () => {
	WIDTH = canvas.width = window.innerWidth;
	HEIGHT = canvas.height = window.innerHeight;
	mouse.radius = (WIDTH / 80) * (HEIGHT / 80);
	
	init();
});

addEventListener('mouseout', (event) => {
	mouse.x = undefined;
	mouse.y = undefined;
});


/***************************** Started *****************************/
init();
animate();