/**
	https://www.youtube.com/watch?v=eI9idPTT0c4
**/

var scoreElement = document.querySelector("#score");
var bigScoreElement = document.querySelector("#bigScore");
var modelElement = document.querySelector("#model");
var btnStartGame = document.querySelector("#btnStartGame");
var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

const mouse = {
	x: WIDTH / 2,
	y: HEIGHT / 2
};



/***************************** Class *****************************/
class Player
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

class Projectile
{
	constructor(x, y, radius, color, velocity)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
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
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
	}
}

class Enemy
{
	constructor(x, y, radius, color, velocity)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
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
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
	}
}

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
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
		this.alpha -= 0.01;
	}
}



/***************************** Functions *****************************/

var score = 0;
var animationId;
var player = new Player(WIDTH / 2, HEIGHT / 2, 10, 'white');
var projectiles = [];
var particles = [];
var enemies = [];

function init()
{
	score = 0;
	player = new Player(WIDTH / 2, HEIGHT / 2, 10, 'white');
	projectiles = [];
	particles = [];
	enemies = [];
	scoreElement.innerHTML = 0;
	bigScoreElement.innerHTML = 0;
	
	spawnEnemies();
}

function animate()
{
	animationId = requestAnimationFrame(animate);
	ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	
	player.update();
	
	particles.forEach((particle, index) => {
		if(particle.alpha <= 0)
		{
			particles.splice(index, 1);
		}
		else
		{
			particle.update();			
		}
	});
	
	projectiles.forEach((projectile, index) => {
		projectile.update();
		
		/// Ekran dışına kaçan Projectile delete
		if(projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > WIDTH || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > HEIGHT)
		{
			setTimeout(() => {
				projectiles.splice(index, 1);					
			}, 0);
		}
		
	});
	
	enemies.forEach((enemy, index) => {
		enemy.update();
		
		/// Player is dead & End Game
		const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
		if(dist - enemy.radius - player.radius < 1)
		{
			cancelAnimationFrame(animationId);
			bigScoreElement.innerHTML = score;
			modelElement.style.display = 'flex';
		}
		
		projectiles.forEach((projectile, projectileIndex) => {
			
			/// Enemy and Projectile is dead
			const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
			if(dist - enemy.radius - projectile.radius < 1)
			{
				
				/// Create explosions
				for(var i = 0; i < enemy.radius * 2; i++)
				{
					const particleVelocity = {
						x: (Math.random() - 0.5) * (Math.random() * 8),
						y: (Math.random() - 0.5) * (Math.random() * 8)
					};
					particles.push(new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, particleVelocity));
				}
				
				if(enemy.radius - 10 > 5)
				{
					/// increment score
					score += 100;
					scoreElement.innerHTML = score;
					
					const enemyData = {
						radius: enemy.radius - 10
					};
					gsap.to(enemy, enemyData);
					setTimeout(() => {
						projectiles.splice(projectileIndex, 1);					
					}, 0);
				}
				else
				{
					/// Tamamı yok edildiğinde 250 puan.
					/// increment score
					score += 250;
					scoreElement.innerHTML = score;
					
					setTimeout(() => {
						enemies.splice(index, 1);
						projectiles.splice(projectileIndex, 1);					
					}, 0);
				}
			}
		});
	});
}

function spawnEnemies()
{
	setInterval(() => {
		const radius = Math.random() * (30 - 4) + 4;
		
		var x, y;
		if(Math.random() < 0.5)
		{
			x = Math.random() < 0.5 ? 0 - radius : WIDTH + radius;
			y = Math.random() * HEIGHT
		}
		else
		{
			x = Math.random() * WIDTH
			y = Math.random() < 0.5 ? 0 - radius : HEIGHT + radius;
		}
		const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
		
		const angle = Math.atan2(HEIGHT / 2 - y, WIDTH / 2 - x);
		const velocity = {
			x: Math.cos(angle),
			y: Math.sin(angle)
		};
		
		enemies.push(new Enemy(x, y, radius, color, velocity));
	}, 1000);
}



/***************************** Events *****************************/
addEventListener('click', (event) => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	
	const angle = Math.atan2(mouse.y - HEIGHT / 2, mouse.x - WIDTH / 2);
	const velocity = {
		x: Math.cos(angle) * 6,
		y: Math.sin(angle) * 6
	};
	projectiles.push(new Projectile(WIDTH / 2, HEIGHT / 2, 5, 'white', velocity));
});

btnStartGame.addEventListener('click', (event) => {
	init();
	animate();
	modelElement.style.display = 'none';
});



/***************************** Started *****************************/
