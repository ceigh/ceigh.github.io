import * as T from 'three'

export function getLights (): T.Light[] {
  const light = new T.DirectionalLight()

  light.position.z = 20

  return [light]
}
