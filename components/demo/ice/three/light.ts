import * as T from 'three'

export function getLights (): T.Light[] {
  const sunLight = new T.HemisphereLight(0xEDF5FB, 0xC3D2DB)

  sunLight.position.set(100, 1000, 100)

  return [sunLight]
}
