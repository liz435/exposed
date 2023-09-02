import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const raycaster = new THREE.Raycaster();
renderer.setSize(window.innerWidth, window.innerHeight);

const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const baseColorTexture = textureLoader.load('texture/F_b.jpg');
const heightMapTexture = textureLoader.load('texture/F_h.png');
const normalMapTexture = textureLoader.load('texture/F_n.jpg');
const aoTexture = textureLoader.load('texture/F_ao.jpg');
const RoughMapTexture = textureLoader.load('texture/F_r.jpg');


let count = 0;
document.body.appendChild(renderer.domElement);

const mouse = new THREE.Vector2();

camera.position.z = 5;

document.addEventListener('mousemove', onDocumentMouseMove);

document.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// const geometry2 = new THREE.TorusKnotBufferGeometry(14, 1, 1024, 6,6, 9);
const geometry = new THREE.TorusKnotBufferGeometry(14, 3, 1024, 19,2, 1);
baseColorTexture.repeat.set(10, 10);
baseColorTexture.wrapS = THREE.RepeatWrapping;
baseColorTexture.wrapT = THREE.RepeatWrapping;

heightMapTexture.repeat.set(10, 10);
heightMapTexture.wrapS = THREE.RepeatWrapping;
heightMapTexture.wrapT = THREE.RepeatWrapping;

normalMapTexture.repeat.set(10, 10);
normalMapTexture.wrapS = THREE.RepeatWrapping;
normalMapTexture.wrapT = THREE.RepeatWrapping;

aoTexture.repeat.set(20, 20);
aoTexture.wrapS = THREE.RepeatWrapping;
aoTexture.wrapT = THREE.RepeatWrapping;

RoughMapTexture.repeat.set(20, 20);
RoughMapTexture.wrapS = THREE.RepeatWrapping;
RoughMapTexture.wrapT = THREE.RepeatWrapping;

const uv = [];

for (let i = 0; i < geometry.attributes.position.count; i++) {
  const x = geometry.attributes.position.getX(i);
  const y = geometry.attributes.position.getY(i);
  const z = geometry.attributes.position.getZ(i);

  const u = Math.atan2(y, x) / (2 * Math.PI) + 0.9;
  const v = z / 28 + 0.5;

  uv.push(u, v);
}

geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uv), 2));

const whiteMat = new THREE.MeshBasicMaterial({color: 0xff9a14});


const material = new THREE.MeshStandardMaterial({
  map: baseColorTexture,
  displacementMap: heightMapTexture,
  displacementScale: 0.1,
  normalMap: normalMapTexture,
  normalScale: new THREE.Vector2(0.1, 0.1),
  aoMap: aoTexture,
  roughnessMap: RoughMapTexture,
  transparent : true
  
});


  
var cube = new THREE.Mesh ( geometry, whiteMat );
// var thisObj = new THREE.Mesh(geometry2, whiteMat );
// thisObj.scale.set(0.5,0.5,0.5);

scene.add(cube );



var ambientLight = new THREE.AmbientLight ( 0xffffff, 1)
scene.add( ambientLight )


// point light
var pointLight = new THREE.PointLight( 0xffffff, 0.9 );
pointLight.position.set( 25, 50, 25 );
scene.add( pointLight );



function render() {

let status = false;

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );
	// console.log(intersects)

}


function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


function animate() {
	requestAnimationFrame( animate )
	// thisObj.position.set(mouse.x, mouse.y,4);
	cube.rotation.x -= mouse.y/200;
	cube.rotation.y += mouse.x/200;
  // thisObj.rotation.x += mouse.y/200;
	// thisObj.rotation.y -= mouse.x/200;
	// wireframeCube.rotation.x += mouse.x/40;
	// wireframeCube.rotation.y -= mouse.y/40;
	// pin.rotation.x += mouse.x/40;
	// pin.rotation.y -= mouse.y/40;
	renderer.render( scene, camera );
	window.requestAnimationFrame(render);
}

animate()