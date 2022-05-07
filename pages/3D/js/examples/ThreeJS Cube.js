var width = window.innerWidth;
var height = window.innerHeight;
var scene, camera, renderer;
var boxGeometry, matCube, cube;

function setup()
{
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	renderer = new THREE.WebGLRenderer();
	
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);

	/** Cube Nesnesini oluşturduk **/
	boxGeometry = new THREE.BoxGeometry();
	matCube = new THREE.MeshBasicMaterial({color: 0xff0000});
	cube = new THREE.Mesh(boxGeometry, matCube);
	
	scene.add(cube);
	camera.position.z = 5;
}

function update()
{
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
}

function loop()
{
	/// Her Karede 60 kez Çağrılır.
	requestAnimationFrame(loop);
	update();
	renderer.render(scene, camera);
}

setup();
loop();