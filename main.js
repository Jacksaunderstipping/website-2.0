import "./style.css";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );

var ambient = new THREE.AmbientLight( 0x444444 );
scene.add( ambient );

var directionalLight = new THREE.DirectionalLight( 0xffeedd );
directionalLight.position.set( 0, 0, 1 ).normalize();
scene.add( directionalLight );



camera.position.z = 5;

const loader = new GLTFLoader();
loader.load(
  "untitled.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
  function (error) {
    console.error(error);
  }
);

function render() {

  window.requestAnimationFrame( render );
  renderer.render( scene, camera );

}

render();
