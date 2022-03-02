import "./style.css";
import * as THREE from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui' 
import gsap from 'gsap'

/**
 *  Debug 
 **/ 
const gui = new dat.GUI()
gui.hide()//开局隐藏
const parameters = {
  color:0xffffff,
  spin: () =>{
    gsap.to(mesh.rotation,{duration:1,y:mesh.rotation.y+10})
  }
}
console.log(parameters.color)

// Canvas
const canvas = document.querySelector('canvas.webgl')

//Size
const sizes = {
  width:window.innerWidth,
  height:window.innerHeight
}

window.addEventListener('resize',() =>{
  sizes.width = window.innerWidth,
  sizes.height = window.innerHeight,

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix(),
  
  renderer.setSize(sizes.width,sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})


//Scene 
const scene = new THREE.Scene()

//Camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,1000)
camera.position.z = 3
camera.lookAt(new THREE.Vector3(0,0,0))

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas:canvas
})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 5));

//Object
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({
  color: parameters.color
})
const mesh = new  THREE.Mesh(geometry,material)
scene.add(mesh)

//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
console.log(mesh)
//Debug 
gui.add(mesh.position,'y',-3,3,0.01)
gui.addColor(parameters,'color').onChange((e) =>{
  console.log(e)
  material.color.set(e)
})
.name('materialColor')

gui.add(parameters,'spin')




//Animate
const tick = () =>{
  renderer.render(scene,camera)
  window.requestAnimationFrame(tick)
}
tick()