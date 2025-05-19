/**
	https://www.youtube.com/watch?v=_MyPLZSGS3s
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

const mouse = {
	x: WIDTH / 2,
	y: HEIGHT / 2
};

/***************************** Events *****************************/
addEventListener('mousemove', (event) => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

/***************************** Functions *****************************/
function animate()
{
	requestAnimationFrame(animate);
	ctx.fillStyle = "#1A1A23";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	
	if(mouse.x + 100 >= WIDTH / 2 - 50 && mouse.x <= WIDTH / 2 - 50 + 100 && 
	   mouse.y + 100 >= HEIGHT / 2 - 50 && mouse.y <= HEIGHT / 2 - 50 + 100)
	{
		console.log("colliding");
	}
	
	ctx.fillStyle = "#E86262";
	ctx.fillRect(mouse.x, mouse.y, 100, 100);
	
	ctx.fillStyle = "#92ABEA";
	ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100);
}

/***************************** Started *****************************/
animate();