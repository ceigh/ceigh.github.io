import * as T from "three"

export function getLights (): T.Light[] {
  const white = 0xEDF5FB

  const light1 = new T.HemisphereLight(white, 0x010C30)

  const light2 = new T.DirectionalLight(white, 0.2)
  light2.position.set(0, 4000, 2000)

  return [light1, light2]
}
