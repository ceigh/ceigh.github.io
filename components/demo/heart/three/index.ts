import * as THREE from 'three'
import Stats from 'stats.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { getCamera } from './camera'
import { getScene } from './scene'
import { getRenderer } from './renderer'
import { getLights } from './light'
import { getHeart, getFloor } from './mesh'
import { degree } from '~/plugins/three'

let renderer: THREE.WebGLRenderer
let camera: THREE.Camera
let controls: OrbitControls

let scene: THREE.Scene
let lights: THREE.Light[]
let heart: THREE.Group

const isDev = process.env.NODE_ENV === 'development'
let stats: Stats

function animation (time: number): void {
  const sec = time / 1000
  const heartScale = 1 + (1 + Math.sin(sec)) / 10
  heart.scale.set(heartScale, heartScale, heartScale)
  heart.rotation.y = sec
  renderer.render(scene, camera)
}

function animationDev (time: number): void {
  stats.begin()
  animation(time)
  stats.end()
}

let animationFn = animation

export function start (rendererContainer: HTMLElement): void {
  const [w, h] = [window.innerWidth, window.innerHeight]
  renderer = getRenderer(w, h)
  camera = getCamera(w, h)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 8
  controls.maxDistance = 20
  controls.maxPolarAngle = 85 * degree

  scene = getScene()
  lights = getLights()
  heart = getHeart()

  scene.add(getFloor())
  scene.add(heart)
  lights.forEach(l => scene.add(l))

  if (isDev) {
    animationFn = animationDev

    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    const lightHelpers = lights
      .map(l => new THREE.CameraHelper(l.shadow.camera))
    lightHelpers.forEach((h) => { scene.add(h) })

    stats = new Stats()
    stats.showPanel(0)
    document.body.appendChild(stats.dom)
  }

  rendererContainer.appendChild(renderer.domElement)
  renderer.setAnimationLoop(animationFn)

  // eslint-disable-next-line no-console
  setTimeout(() => console.log(renderer.info.render), 2000)
}

export function stop (): void {
  renderer.setAnimationLoop(null)
  if (isDev) { // remove stats
    const { body } = document
    body.removeChild(body.lastChild as HTMLElement)
  }
}
