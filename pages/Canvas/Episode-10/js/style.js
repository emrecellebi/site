/**
	https://www.youtube.com/watch?v=VNmTubIDZOY
**/

var canvas = document.querySelector("canvas");
var WIDTH = canvas.width = window.innerWidth;
var HEIGHT = canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var gui = new dat.GUI();

const wave = {
	y: HEIGHT / 2,
	length: 0.01,
	amplitude: 100,
	frequency: 0.01
};

const strokeColor = {
	h: 200,
	s: 50,
	l: 50
};

const backgroundColor = {
	r: 0,
	g: 0,
	b: 0,
	a: 0.01
};

const waveFolder = gui.addFolder('wave');
waveFolder.add(wave, 'y', 0, HEIGHT);
waveFolder.add(wave, 'length', -0.01, 0.01);
waveFolder.add(wave, 'amplitude', -300, 300);
waveFolder.open();

const strokeFolder = gui.addFolder('stroke');
strokeFolder.add(strokeColor, 'h', 0, 255);
strokeFolder.add(strokeColor, 's', 0, 100);
strokeFolder.add(strokeColor, 'l', 0, 100);
strokeFolder.open();

const backgroundFolder = gui.addFolder('background');
backgroundFolder.add(backgroundColor, 'r', 0, 255);
backgroundFolder.add(backgroundColor, 'g', 0, 255);
backgroundFolder.add(backgroundColor, 'b', 0, 255);
backgroundFolder.add(backgroundColor, 'a', 0, 1);
backgroundFolder.open();

var increment = wave.frequency;
function animate()
{
	requestAnimationFrame(animate);
	
	ctx.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`;
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.beginPath();
	
	ctx.moveTo(0, HEIGHT / 2);
	
	for(var i = 0; i < WIDTH; i++)
	{
		ctx.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
		// ctx.lineTo(i, wave.y + (Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment) / i) * 100);
	}
	
	ctx.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${strokeColor.s}%, ${strokeColor.l}%)`;
	ctx.stroke();
	
	increment += wave.frequency;
}

animate();