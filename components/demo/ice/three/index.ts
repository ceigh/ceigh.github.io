import * as T from 'three'
import Stats from 'stats.js'
import { getCamera } from './camera'
import { getControls } from './controls'
import { getScene } from './scene'
import { getRenderer } from './renderer'
import { getLights } from './light'
import { getWater, getIceberg } from './mesh'

const isDev = process.env.NODE_ENV === 'development'
let renderer: T.WebGLRenderer

export function start (rendererContainer: HTMLElement): void {
  const [w, h] = [window.innerWidth, window.innerHeight]
  renderer = getRenderer(w, h)
  const rendererDom = renderer.domElement
  const camera = getCamera(w, h)
  const controls = getControls(camera, rendererDom)

  const scene = getScene(renderer)
  const lights = getLights()
  const water = getWater()
  const iceberg = getIceberg()
  lights.forEach(l => scene.add(l))
  scene.add(water)
  scene.add(iceberg)

  function animation () {
    const waterMaterial = water.material as T.ShaderMaterial
    waterMaterial.uniforms.time.value += 0.015
    renderer.render(scene, camera)
    controls.update()
  }
  renderer.setAnimationLoop(animation)

  rendererContainer.appendChild(rendererDom)

  if (!isDev) { return }
  const axesHelper = new T.AxesHelper(100)
  scene.add(axesHelper)

  const stats = new Stats()
  stats.showPanel(0)
  document.body.appendChild(stats.dom)
  renderer.setAnimationLoop(() => {
    animation()
    stats.update()
  })

  // eslint-disable-next-line no-console
  setTimeout(() => console.log(renderer.info.render), 2000)
}

export function stop (): void {
  renderer.setAnimationLoop(null)

  if (!isDev) { return }
  const { body } = document
  body.removeChild(body.lastChild as HTMLElement)
}
