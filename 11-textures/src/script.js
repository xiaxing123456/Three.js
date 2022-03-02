import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


//Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Textures
 */ 



const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/textures/door/1.jpg')
texture.rotation = 1
texture.center.x =0.5
texture.center.y =1



//Size
const sizes = {
  width:window.innerWidth,
  height:window.innerHeight
}
window.addEventListener('resize',()=>{
  sizes.width = window.innerWidth,
  sizes.height = window.innerHeight,

  camera.aspect = sizes.width / sizes.height,
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width,sizes.height)
  renderer.setPixeRatio(Math.min(window.devicePixelRatio,2))
})

// Scene
const scene = new THREE.Scene()

//Camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,1000)
camera.position.set(1,1,1)
scene.add(camera)

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas:canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Object
const geometry = new THREE.BoxBufferGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({map:texture})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

//Animate
const tick = () =>{
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(tick)
}
tick()
