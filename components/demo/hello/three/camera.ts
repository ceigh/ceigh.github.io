import * as T from 'three'

export function getCamera (w: number, h: number):
T.PerspectiveCamera {
  const camera = new T.PerspectiveCamera(60, w / h, 1, 20)

  camera.position.z = 10

  return camera
}
