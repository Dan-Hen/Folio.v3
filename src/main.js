import '../src/style.scss';

import * as THREE from 'three';

const scene = new THREE.Scene();

//set the size of the camera. In order : field of view, aspect ratio, view frustum
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    //set the background of the canvas transparent
    alpha: true,
    canvas: document.querySelector('#bg'),
  });

//set the size of canvas by the size of the screen
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//add mesh / geometry and materials
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshBasicMaterial ( {color: 0XEC7442, wireframe: true } );
const torus = new THREE.Mesh ( geometry, material);

//render the scene
scene.add (torus) 

//render the scene
function animate() {
    requestAnimationFrame ( animate );
    renderer.render (scene, camera);
}

animate()


