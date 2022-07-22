/*
  Johan Karlsson (DonKarlssonSan) 2017
*/
const colorConfig = {
  particleOpacity: 0.21,
  baseHue: 300,
  hueRange: 20,
  hueSpeed: 0.02,
  colorSaturation: 100 };


class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = spikeLength;
    this.angle = Math.random() * Math.PI * 2;
  }

  move() {
    this.length += Math.random() - 0.5;
    this.angle += (Math.random() - 0.5) / 10;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    let x2 = this.x + Math.cos(this.angle) * this.length;
    let y2 = this.y + Math.sin(this.angle) * this.length;
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }}


let canvas;
let ctx;
let w, h;
let hue;
let particles;
let spikeLength;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("resize", reset);
  reset();
}

function reset() {
  hue = colorConfig.baseHue;
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  spikeLength = w * 0.03;
  drawText();
}

function draw() {
  drawBackground(0.7);
  requestAnimationFrame(draw);
  drawParticles();
}

function drawBackground(alpha) {
  ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
  ctx.fillRect(0, 0, w, h);
}

function drawText() {
  ctx.save();
  let text = "MELEK";
  let fontSize = w * 0.23;
  ctx.font = "bold " + fontSize + "px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";
  ctx.strokeText(text, w / 2, h / 2);
  ctx.restore();
  let imageData = ctx.getImageData(0, 0, w, h);

  particles = [];

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let i = (x + w * y) * 4;
      let average = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2] + imageData.data[i + 3]) / 4;
      if (average > 200) {
        let particle = new Particle(x, y);
        particles.push(particle);
      }
    }
  }
}

function drawParticles() {
  hue += colorConfig.hueSpeed;
  let h = Math.sin(hue) * colorConfig.hueRange + colorConfig.baseHue;
  ctx.strokeStyle = `hsla(${h}, ${colorConfig.colorSaturation}%, 50%, ${colorConfig.particleOpacity})`;
  particles.forEach(p => {
    p.move();
    p.draw();
  });
}

setup();
draw();