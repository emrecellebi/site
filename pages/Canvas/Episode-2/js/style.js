/**
	https://www.youtube.com/watch?v=83L6B13ixQ0
**/

var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
ctx.fillRect(100, 100, 100, 100);
ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
ctx.fillRect(400, 100, 100, 100);
ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
ctx.fillRect(300, 300, 100, 100);

/// Line
ctx.beginPath();
ctx.moveTo(50, 300);
ctx.lineTo(300, 100);
ctx.lineTo(400, 300);
ctx.strokeStyle = "#fa34a3";
ctx.stroke();

/// Arc / Circle
for(var i = 0; i < 4; i++)
{
	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;
	ctx.beginPath();
	ctx.arc(x, y, 30, 0, Math.PI * 2, false);
	ctx.strokeStyle = "blue";
	ctx.stroke();
}