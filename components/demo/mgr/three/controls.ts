import * as T from 'three'
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

export function getControls (camera: T.Camera,
  rendererDom: HTMLElement): OrbitControls {
  const controls = new OrbitControls(camera, rendererDom)

  controls.minDistance = 5
  controls.maxDistance = 30
  controls.maxPolarAngle = Math.PI / 2
  controls.enablePan = false

  return controls
}
