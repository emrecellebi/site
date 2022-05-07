var width = window.innerWidth;
var height = window.innerHeight;
var scene, camera, renderer;
var fbxLoader, dirLight, hemiLight, plane, controls, clock, grid;
let mixer;

setup();
loop();

function setup()
{
	clock = new THREE.Clock();
	
	/** Camera **/
	camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
	camera.position.set(0, 125, 350);
	
	/** Sahne **/
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xa0a0a0);
	scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
	
	/** Hemisphere Light **/
	hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
	hemiLight.position.set(0, 200, 0);
	scene.add(hemiLight);
	
	/** Directional Light **/
	dirLight = new THREE.DirectionalLight(0xffffff);
	dirLight.position.set(0, 200, 100);
	dirLight.castShadow = true;
	dirLight.shadow.camera.top = 180;
	dirLight.shadow.camera.bottom = -100;
	dirLight.shadow.camera.left = -120;
	dirLight.shadow.camera.right = 120;
	scene.add(dirLight);
	
	grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
	grid.material.opacity = 0.2;
	grid.material.transparent = true;
	scene.add(grid);
	
	plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({color: 0x999999, depthWrite: false}));
	plane.rotation.x = -Math.PI / 2;
	plane.receiveShadow = true;
	scene.add(plane);
	
	fbxLoader = new THREE.FBXLoader()
	fbxLoader.load(
		'https://threejs.org/examples/models/fbx/Samba Dancing.fbx',
		// 'file://D:/Cizimler/HTML/assets/julia_meshes_BASE_01.fbx',
		(object) => { /// onLoaded function
			mixer = new THREE.AnimationMixer( object );
			const action = mixer.clipAction(object.animations[0]);
			action.play();
			
			object.traverse(
			(child) => {
				if(child.isMesh)
				{
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
			scene.add(object);
		},
		(xhr) => { /// onProgress function
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
		},
		(error) => { /// enError function
			console.log(error);
		}
	);
	
	/** Borowserda gösterilecek alan **/
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(width, height);
	renderer.shadowMap.enabled = true;
	document.body.appendChild(renderer.domElement);
}

function update()
{
	const delta = clock.getDelta();
	if(mixer)
		mixer.update(delta);
}

function loop()
{
	/// Her Karede 60 kez Çağrılır.
	requestAnimationFrame(loop);
	update();
	renderer.render(scene, camera);
}