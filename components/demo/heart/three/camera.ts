import * as T from 'three'

export function getCamera (w: number, h: number): T.PerspectiveCamera {
  const camera = new T.PerspectiveCamera(75, w / h, 0.01, 50)

  camera.position.z = -10
  camera.position.y = 8
  camera.rotation.x = -Math.PI / 6

  return camera
}
