import * as THREE from 'https://cdn.skypack.dev/three@v0.128.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@v0.128.0/examples/jsm/controls/OrbitControls.js'

let container;
let camera, cameraTarget, scene, renderer, pointLight, controls;
let sphere, material, geometry;

const clock = new THREE.Clock()

function init() {

    container = document.querySelector( '.content' );

    // SCENE

    scene = new THREE.Scene();

    // CAMERA

    camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 2
    
    scene.add(camera)

    cameraTarget = new THREE.Vector3( 0, 0, 0 );

    // LIGHTS

    pointLight = new THREE.PointLight(0xffffff, 0.1)
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4
    scene.add(pointLight)

    // OBJECT
    geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

    // Materials
    material = new THREE.MeshBasicMaterial()
    material.color = new THREE.Color(0xff0000)

    // Mesh
    sphere = new THREE.Mesh(geometry,material)
    scene.add(sphere)

    // RENDERER

    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( container.clientWidth, container.clientWidth * 0.5 );
    container.appendChild( renderer.domElement );

    // Controls
    controls = new OrbitControls(camera, container)
    controls.enableDamping = true
    
    // EVENTS


}

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    const elapsedTime = clock.getElapsedTime()
    camera.lookAt( cameraTarget );

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    renderer.render( scene, camera );

}

function onWindowsResize(){
    renderer.setSize( container.clientWidth, container.clientWidth * 0.5 );
}

init();
animate();
window.addEventListener("resize", onWindowsResize);
