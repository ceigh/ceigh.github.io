import { PerspectiveCamera } from 'three'
import { degree } from '~/plugins/three'

export function getCamera (w: number, h: number): PerspectiveCamera {
  const camera = new PerspectiveCamera(75, w / h, 0.01, 50)

  camera.position.z = -10
  camera.position.y = 8
  camera.rotation.x = -30 * degree

  return camera
}
