/**
	https://www.youtube.com/watch?v=lNz8LOk438U
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var colors = [
	"#00bdff",
	"#4d39ce",
	"#088eff",
];

var gravity = 1;
var friction = 0.59;

window.addEventListener("resize", function(event){
	this.WIDTH = canvas.width = window.innerWidth;
	this.HEIGHT = canvas.height = window.innerHeight;
	
	init();
});

/// Utility Function
function randomIntFromRange(min, max)
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

/// Object
function Star(x, y, radius, color)
{
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.velocity = {
		x: (Math.random() - 0.5) * 8,
		y: 3
	};
	this.friction = 0.8;
	this.gravity = 1;
}

Star.prototype.draw = function()
{
	ctx.save();
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	ctx.fillStyle = this.color;
	ctx.shadowColor = "#e3eaef";
	ctx.shadowBlur = 20;
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}

Star.prototype.update = function()
{
	this.draw();
	
	/// When ball hits bottom of screen
	if(this.y + this.radius + this.velocity.y > HEIGHT - groundHeight)
	{
		this.velocity.y = -this.velocity.y * this.friction;
		this.shatter();
	}
	else
	{
		this.velocity.y += this.gravity;
	}
	
	/// Hist side of screen
	if(this.x + this.radius + this.velocity.x > WIDTH || this.x - this.radius <= 0)
	{
		this.velocity.x = -this.velocity.x * this.friction;
		this.shatter();
	}
	
	this.x += this.velocity.x;
	this.y += this.velocity.y;
}

Star.prototype.shatter = function()
{
	this.radius -= 3;
	for(var i = 0; i < 8; i++)
	{
		miniStars.push(new MiniStar(this.x, this.y, 2));
	}
}

/// Object
function MiniStar(x, y, radius, color)
{
	Star.call(this, x, y, radius, color);
	this.velocity = {
		x: randomIntFromRange(-5, 5),
		y: randomIntFromRange(-15, 15)
	};
	this.friction = 0.8;
	this.gravity = 0.1;
	this.ttl = 100;
	this.opacity = 1;
}

MiniStar.prototype.draw = function()
{
	ctx.save();
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	ctx.fillStyle = `rgba(227, 234, 239, ${this.opacity})`;
	ctx.shadowColor = "#e3eaef";
	ctx.shadowBlur = 20;
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}

MiniStar.prototype.update = function()
{
	this.draw();
	
	/// When ball hits bottom of screen
	if(this.y + this.radius + this.velocity.y > HEIGHT - groundHeight)
	{
		this.velocity.y = -this.velocity.y * this.friction;
	}
	else
	{
		this.velocity.y += this.gravity;
	}
	
	this.x += this.velocity.x;
	this.y += this.velocity.y;
	this.ttl -= 1;
	this.opacity -= 1 / this.ttl;
}

function createMountainRange(mountainAmount, height, color)
{
	for(var i = 0; i < mountainAmount; i++)
	{
		var mountainWidth = WIDTH / mountainAmount;
		ctx.beginPath();
		ctx.moveTo(i * mountainWidth, HEIGHT);
		ctx.lineTo(i * mountainWidth + mountainWidth + 325, HEIGHT);
		ctx.lineTo(i * mountainWidth + mountainWidth / 2, HEIGHT - height);
		ctx.lineTo(i * mountainWidth - 325, HEIGHT);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	}
} 

/// Implementation
var backgroundGradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
backgroundGradient.addColorStop(0, "#171e26");
backgroundGradient.addColorStop(0, "#3f586b");
var stars;
var miniStars;
var backgroundStars;
var ticker = 0;
var randomSpwnRate = 75;
var groundHeight = 100;
function init()
{
	stars = [];
	miniStars = [];
	backgroundStars = [];
	
	/* for(var i = 0; i < 1; i++)
	{
		stars.push(new Star(WIDTH / 2, 30, 30, "#e3eaef"));
	} */
	
	for(var i = 0; i < 150; i++)
	{
		var x = Math.random() * WIDTH;
		var y = Math.random() * HEIGHT;
		var radius = Math.random() * 3;
		backgroundStars.push(new Star(x, y, radius, "white"));
	}
}

/// Animation Loop
function animate()
{
	ctx.fillStyle = backgroundGradient;
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	
	backgroundStars.forEach(backgroundStar => {
		backgroundStar.draw();
	});
	
	createMountainRange(1, HEIGHT - 50, "#384551");
	createMountainRange(2, HEIGHT - 100, "#2B3843");
	createMountainRange(3, HEIGHT - 300, "#26333E");
	ctx.fillStyle = "#182028";
	ctx.fillRect(0, HEIGHT - groundHeight, WIDTH, groundHeight);
	
	stars.forEach((star, index) => {
		star.update();
		if(star.radius == 0)
		{
			stars.splice(index, 1);
		}
	});
	
	miniStars.forEach((miniStar, index) => {
		miniStar.update();
		if(miniStar.ttl == 0)
		{
			miniStars.splice(index, 1);
		}
	});
	
	ticker++;
	
	if(ticker % 75 == 0)
	{
		var radius = 12;
		var x = Math.max(radius, Math.random() * WIDTH - radius);
		stars.push(new Star(x, -100, radius, "white"));
		randomSpwnRate = randomIntFromRange(75, 200);
	}
	
	requestAnimationFrame(animate);
}

init();
animate();