import * as T from "three"

export function getScene (): T.Scene {
  const scene = new T.Scene()

  scene.fog = new T.Fog(0x000000, 0, 35)

  return scene
}
