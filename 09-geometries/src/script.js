import './style.css'
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import { Camera, WebGL1Renderer } from 'three';

//Canvas
const canvas = document.querySelector("canvas.webgl");
//Sizes
const sizes = {
  width:window.innerWidth,
  height:window.innerHeight
}
window.addEventListener("resize",() =>{
  //Update sizes
  sizes.width = window.innerWidth,
  sizes.height = window.innerHeight

  //Update camera
  camera.aspect = sizes.width / sizes.height

  //Update renderer
  renderer.setSize(sizes.width,sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

//Scene
const scene = new THREE.Scene()

//Camera
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(0,0,3)
scene.add(camera)

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas:canvas
})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const positionsArray = new Float32Array(32)
console.log(positionsArray)
//Object
const geometry = new THREE.BoxBufferGeometry(1,1,1,2,2,2)
const Material = new THREE.MeshBasicMaterial({
  color:0x00ffff,
  wireframe:true
})
const Mesh = new THREE.Mesh(geometry,Material)
scene.add(Mesh)

//Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

//Animate
const tick = () =>{
  renderer.render(scene,camera)
  window.requestAnimationFrame(tick)
}
tick()

