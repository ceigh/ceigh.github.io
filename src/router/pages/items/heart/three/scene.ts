import * as T from "three"

export function getScene (): T.Scene {
  const scene = new T.Scene()

  const fog = new T.Fog(0x000000, 1, 40)
  scene.fog = fog

  return scene
}
