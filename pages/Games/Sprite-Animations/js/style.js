let playerState = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function(e){
	playerState = e.target.value;
});

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGTH = canvas.height = 600;

const player = new Image();
player.src = "./res/img/shadow_dog.png"; 	///https://www.frankslaboratory.co.uk/downloads/shadow_dog.png
const spriteWidth = 575, spriteHeigth = 523; 	/// CANVAS_WIDTH / 12 /// CANVAS_HEIGTH / 10
let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
	{name: "idle", frames: 7},
	{name: "jump", frames: 7},
	{name: "fall", frames: 7},
	{name: "run", frames: 9},
	{name: "dizzy", frames: 11},
	{name: "sit", frames: 5},
	{name: "roll", frames: 7},
	{name: "bite", frames: 7},
	{name: "ko", frames: 12},
	{name: "getHit", frames: 4}
];
animationStates.forEach((state, index) => {
	let frames = {
		loc: []
	};
	for(let j = 0; j < state.frames; j++)
	{
		let positionX = j * spriteWidth;
		let positionY = index * spriteHeigth;
		frames.loc.push({x: positionX, y: positionY});
	}
	spriteAnimations[state.name] = frames;
});

console.log(spriteAnimations);

function animate()
{
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
	let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
	let frameX = spriteWidth * position;
	let frameY = spriteAnimations[playerState].loc[position].y;
	
	ctx.drawImage(player, frameX, frameY, spriteWidth, spriteHeigth, 0, 0, spriteWidth, spriteHeigth);
	
	gameFrame++;
	requestAnimationFrame(animate);
}
animate();