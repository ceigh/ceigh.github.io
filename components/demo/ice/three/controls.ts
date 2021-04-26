import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function addControls (camera: T.Camera,
  rendererDom: HTMLElement): void {
  const controls = new OrbitControls(camera, rendererDom)

  controls.minDistance = 200
  controls.maxDistance = 600
  controls.maxPolarAngle = Math.PI / 2.5
  controls.enablePan = false
}
