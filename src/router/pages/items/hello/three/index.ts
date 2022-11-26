import * as T from "three"
import Stats from "stats.js"
import { getCamera } from "./camera"
import { getScene } from "./scene"
import { getRenderer } from "./renderer"
import { getKitties } from "./mesh"
import { getBulb, removeLightEvents } from "./light"

const isDev = process.env.NODE_ENV === "development"
let renderer: T.WebGLRenderer

export async function start (rendererContainer: HTMLElement,
  size: 0 | 1, shadows: boolean): Promise<void> {
  const [w, h] = [window.innerWidth, window.innerHeight]
  renderer = getRenderer(w, h, shadows)
  const rendererDom = renderer.domElement
  const camera = getCamera(w, h)

  const scene = getScene()
  const bulb = getBulb(w, h, camera, shadows)
  const kitties = await getKitties(w, h, size, shadows)
  scene.add(bulb, kitties)

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
  removeLightEvents()

  if (!isDev) { return }
  const { body } = document
  body.removeChild(body.lastChild as HTMLElement)
}
