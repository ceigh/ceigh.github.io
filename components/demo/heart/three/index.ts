import * as T from 'three'
import Stats from 'stats.js'
import { getCamera } from './camera'
import { getControls } from './controls'
import { getScene } from './scene'
import { getRenderer } from './renderer'
import { getLights } from './light'
import { getHeart, getFloor } from './mesh'

const isDev = process.env.NODE_ENV === 'development'
let renderer: T.WebGLRenderer

export async function start (rendererContainer: HTMLElement): Promise<void> {
  const [w, h] = [window.innerWidth, window.innerHeight]
  renderer = getRenderer(w, h)
  const rendererDom = renderer.domElement
  const camera = getCamera(w, h)
  const controls = getControls(camera, rendererDom)

  const scene = getScene()
  const lights = getLights()
  const heart = getHeart()

  scene.add(await getFloor())
  scene.add(heart)
  lights.forEach(l => scene.add(l))

  function animation (time: number): void {
    controls.update()
    const sec = time / 1000
    const heartScale = 1 + (1 + Math.sin(sec)) / 10
    heart.scale.set(heartScale, heartScale, heartScale)
    heart.rotation.y = sec
    renderer.render(scene, camera)
  }
  renderer.setAnimationLoop(animation)

  rendererContainer.appendChild(rendererDom)

  if (!isDev) { return }
  const axesHelper = new T.AxesHelper(5)
  scene.add(axesHelper)

  const lightHelpers = lights
    .map(l => new T.CameraHelper(l.shadow.camera))
  lightHelpers.forEach((h) => { scene.add(h) })

  const stats = new Stats()
  stats.showPanel(0)
  document.body.appendChild(stats.dom)
  renderer.setAnimationLoop((time: number) => {
    animation(time)
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
