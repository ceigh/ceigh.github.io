import { Scene, Fog } from 'three'

export function getScene (): Scene {
  const scene = new Scene()

  const fog = new Fog(0x000000, 1, 40)
  scene.fog = fog

  return scene
}
