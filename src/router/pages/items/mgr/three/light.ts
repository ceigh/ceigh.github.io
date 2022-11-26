import * as T from "three"

export function getLights (): T.Light[] {
  const spotLight1 = new T.SpotLight()
  spotLight1.intensity = 0.5
  spotLight1.position.set(0, 30, 0)

  const spotLight2 = new T.SpotLight()
  spotLight2.intensity = 0.5
  spotLight2.position.set(0, -30, 0)

  const spotLight3 = new T.SpotLight()
  spotLight3.position.set(0, 1, 30)

  return [spotLight1, spotLight2, spotLight3]
}
