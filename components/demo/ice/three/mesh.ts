import * as T from 'three'
import { Water } from 'three/examples/jsm/objects/Water'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function getWater (): T.Mesh {
  const geometry = new T.CircleGeometry(20000)

  const mesh = new Water(geometry, {
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
    fog: false
  })
  mesh.rotation.x = -Math.PI / 2

  return mesh
}

export function addIceberg (scene: T.Scene): void {
  const loader = new GLTFLoader()
  loader.load('/objects/iceberg.glb', ({ scene: iceberg }) => {
    const color = 0xD1E1FF
    iceberg.traverse((c) => {
      if (c instanceof T.Mesh) {
        c.material = new T.MeshPhongMaterial({
          color,
          shininess: 64
        })
      }
    })
    iceberg.scale.set(2, 2, 2)
    scene.add(iceberg)
  })
}
