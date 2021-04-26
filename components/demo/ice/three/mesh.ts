import * as T from 'three'
import { Water } from 'three/examples/jsm/objects/Water'

export function getWater (): T.Mesh {
  const waterGeometry = new T.PlaneGeometry(10000, 10000)

  const water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new T.TextureLoader()
      .load('/images/textures/waternormals.jpg', (t) => {
        t.wrapS = t.wrapT = T.RepeatWrapping
      }),
    sunDirection: new T.Vector3(),
    waterColor: 0x000115,
    sunColor: 0xFFFFFF,
    distortionScale: 3,
    fog: true
  })

  water.rotation.x = -Math.PI / 2
  return water
}

export function getIceberg (): T.Mesh {
  const geometry = new T.BoxGeometry(100, 50, 50)
  const material = new T.MeshPhongMaterial({
    shininess: 150
  })
  const iceberg = new T.Mesh(geometry, material)

  return iceberg
}
