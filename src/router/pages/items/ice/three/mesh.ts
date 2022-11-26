import * as T from "three"
import { Water } from "three/examples/jsm/objects/Water"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export async function getWater (): Promise<T.Mesh> {
  const geometry = new T.CircleGeometry(15000)

  const texture = await new T.TextureLoader()
    .loadAsync("/items/ice/waternormals.jpg")
  texture.wrapS = texture.wrapT = T.RepeatWrapping

  const mesh = new Water(geometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: texture,
    sunDirection: new T.Vector3(),
    waterColor: 0x000115,
    sunColor: 0xFFFFFF,
    distortionScale: 3,
    fog: false,
  })
  mesh.rotation.x = -Math.PI / 2

  return mesh
}

export async function getIceberg (): Promise<T.Group> {
  const { scene } = await new GLTFLoader().loadAsync("/items/ice/iceberg.glb")
  const material = new T.MeshPhongMaterial({
    color: 0xD1E1FF,
    shininess: 128,
  })

  scene.scale.set(2, 2, 2)
  scene.traverse((c) => {
    if (c instanceof T.Mesh) { c.material = material }
  })

  return scene
}
