import * as T from 'three'
import Stats from 'stats.js'
import { getCamera } from './camera'
import { getControls } from './controls'
import { getScene } from './scene'
import { getRenderer } from './renderer'
import { getWater, getIceberg } from './mesh'
import { getLights } from './light'
import { getUpdateRaycaster } from './raycaster'

const isDev = process.env.NODE_ENV === 'development'
let renderer: T.WebGLRenderer

export async function start (rendererContainer: HTMLElement): Promise<void> {
  const [w, h] = [window.innerWidth, window.innerHeight]
  renderer = getRenderer(w, h)
  const rendererDom = renderer.domElement
  const camera = getCamera(w, h)
  const controls = getControls(camera, rendererDom)

  const scene = await getScene(renderer)
  const lights = getLights()
  lights.forEach(l => scene.add(l))
  const water = await getWater()
  scene.add(water)
  const iceberg = await getIceberg()
  scene.add(iceberg)

  const updateRaycaster = getUpdateRaycaster(w, h, camera, scene, iceberg)

  function animation () {
    controls.update()
    updateRaycaster()
    const waterMaterial = water.material as T.ShaderMaterial
    waterMaterial.uniforms.time.value += 0.015
    renderer.render(scene, camera)
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
