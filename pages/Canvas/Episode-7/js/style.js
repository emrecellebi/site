/**
	https://www.youtube.com/watch?v=3b7FyIxWW94
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var mouse = {
	x: 10,
	y: 10
}

var colors = [
	"#2185c5",
	"#7ecefd",
	"#ff7f66",
];

var gravity = 1;
var friction = 0.59;

window.addEventListener("mousemove", function(event){
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

window.addEventListener("resize", function(event){
	this.WIDTH = canvas.width = window.innerWidth;
	this.HEIGHT = canvas.height = window.innerHeight;
	
	init();
});

window.addEventListener("click", function(event){
	init();
});

/// Utility Function
function randomFromRange(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor()
{
	return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2)
{
	var xDist = x2 - x1;
	var yDist = y2 - y1;
	return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle)
{
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle)
{
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

/// Object
function Particle(x, y, radius, color)
{
	this.x = x;
	this.y = y;
	this.velocity = {
		x: (Math.random() - 0.5) * 5,
		y: (Math.random() - 0.5) * 5,
	};
	this.radius = radius;
	this.color = color;
	this.mass = 1;
	this.opacity = 0;
	
	this.draw = function()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.save();
		ctx.globalAlpha = this.opacity;
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.restore();
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.closePath();
	}
	
	this.update = particles => 
	{
		for(var i = 0; i < particles.length; i++)
		{
			if(this === particles[i]) continue;
			
			if(distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0)
			{
				resolveCollision(this, particles[i]);
			}
		}
		
		if(this.x - this.radius <= 0 || this.x + this.radius >= WIDTH)
		{
			this.velocity.x = -this.velocity.x;
		}
		
		if(this.y - this.radius <= 0 || this.y + this.radius >= HEIGHT)
		{
			this.velocity.y = -this.velocity.y;
		}
		
		/// Mouse Collition Detection
		if(distance(mouse.x, mouse.y, this.x, this.y) < 120 && this.opacity < 0.5)
		{
			this.opacity += 0.02;
		}
		else
		{
			this.opacity -= 0.02;
			
			this.opacity = Math.max(0, this.opacity);
		}
		
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		
		this.draw();
	}
}



/// Implementation
var particles;

function init()
{
	particles = [];
	
	for(var i = 0; i < 120; i++)
	{
		var x = randomFromRange(radius, WIDTH - radius);
		var y = randomFromRange(radius, HEIGHT - radius);
		var radius = 15;
		var color = randomColor();
		
		if(i !== 0)
		{
			for(var j = 0; j < particles.length; j++)
			{
				if(distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0)
				{
					x = randomFromRange(radius, WIDTH - radius);
					y = randomFromRange(radius, HEIGHT - radius);
					
					j = -1;
				}
			}
		}
		
		particles.push(new Particle(x, y, radius, color));
	}
}

/// Animation Loop
function animate()
{
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	particles.forEach(particle => {
		particle.update(particles);
	});
	
	requestAnimationFrame(animate);
}

init();
animate();