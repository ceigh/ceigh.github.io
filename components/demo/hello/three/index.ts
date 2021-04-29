import * as T from 'three'
import Stats from 'stats.js'
import { getCamera } from './camera'
import { getScene } from './scene'
import { getRenderer } from './renderer'
import { getKitties } from './mesh'
import { getLights } from './light'

const isDev = process.env.NODE_ENV === 'development'
let renderer: T.WebGLRenderer

export function start (rendererContainer: HTMLElement): void {
  const [w, h] = [window.innerWidth, window.innerHeight]
  renderer = getRenderer(w, h)
  const rendererDom = renderer.domElement
  const camera = getCamera(w, h)

  const scene = getScene()
  scene.add(...getLights(), getKitties())

  function animation () {
    renderer.render(scene, camera)
  }
  renderer.setAnimationLoop(animation)

  rendererContainer.appendChild(rendererDom)

  if (!isDev) { return }
  scene.add(new T.AxesHelper())

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
