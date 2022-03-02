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

//Object
// const geometry = new THREE.Geometry()
// const vertex1 = new THREE.Vector3(0,0,0)
// geometry.vertices.push(vertex1)
// const vertex2 = new THREE.Vector3(0,1,0)
// geometry.vertices.push(vertex2)
// const vertex3 = new THREE.Vector3(1,0,0)
// geometry.vertices.push(vertex3)
// const vertex4 = new THREE.Vector3(1,1,0)
// geometry.vertices.push(vertex4)
// const vertex5 = new THREE.Vector3(1,1,-1)
// geometry.vertices.push(vertex5)

// const face =  new THREE.Face3(0,1,3)
// geometry.faces.push(face)
// const face1 =  new THREE.Face3(0,2,3)
// geometry.faces.push(face1)
// const face2 =  new THREE.Face3(3,4,2)
// geometry.faces.push(face2)

// const geometry = new THREE.BoxGeometry(4,4,4)

const geometry = new THREE.Geometry()
 for(let i = 0;i<50;i++){
   for(let j = 0; j<3;j++){
    geometry.vertices.push(new THREE.Vector3(
      (Math.random()-0.5)*4,
      (Math.random()-0.5)*4,
      (Math.random()-0.5)*4
    ))
   }
   const verticesIndex = i * 3
   geometry.faces.push(new THREE.Face3(
     verticesIndex,
     verticesIndex+1,
     verticesIndex+2
   ))
 }
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

