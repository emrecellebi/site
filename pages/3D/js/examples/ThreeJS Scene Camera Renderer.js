var width = window.innerWidth;
var height = window.innerHeight;
var scene = new THREE.Scene();			/// Shneyi tanıladık
var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000); 		/// Birtane Perspective Camera tanımladık
var renderer = new THREE.WebGLRenderer();		/// Renderlamak için bir Render Tanımladık
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);


