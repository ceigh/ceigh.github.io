import * as T from "three"

function generateSpotLight (color: number): T.SpotLight {
  const spotLight = new T.SpotLight(color, 2)

  spotLight.penumbra = 1
  spotLight.angle = 0.8

  spotLight.castShadow = true
  spotLight.shadow.mapSize.height = 2048
  spotLight.shadow.mapSize.width = 2048

  return spotLight
}

export function getLights (): T.SpotLight[] {
  const lights = [0xFF8888, 0x88FF88, 0x8888FF]
    .map(generateSpotLight)

  lights[0].position.set(0, 10, 5)
  lights[1].position.set(-5, 10, -5)
  lights[2].position.set(5, 10, -5)

  return lights
}
