import * as T from 'three'
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

export function getControls (camera: T.Camera,
  rendererDom: HTMLElement): OrbitControls {
  const controls = new OrbitControls(camera, rendererDom)

  controls.minDistance = 8
  controls.maxDistance = 20
  controls.maxPolarAngle = Math.PI / 2.1
  controls.enablePan = false
  controls.enableDamping = true

  return controls
}
