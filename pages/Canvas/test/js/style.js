/**
	https://www.youtube.com/watch?v=VNmTubIDZOY
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");




function animate()
{
	requestAnimationFrame(animate);
}

animate();