import * as T from 'three'

export function getCamera (w: number, h: number): T.PerspectiveCamera {
  const camera = new T.PerspectiveCamera(60, w / h, 1, 20000)

  camera.position.z = -1000
  camera.position.y = 1500

  return camera
}
