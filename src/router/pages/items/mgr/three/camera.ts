import * as T from "three"

export function getCamera (w: number, h: number):
T.PerspectiveCamera {
  const camera = new T.PerspectiveCamera(60, w / h, 1, 100)

  camera.position.y = 5
  camera.position.z = 20

  return camera
}
