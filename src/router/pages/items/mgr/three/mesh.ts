import * as T from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export async function getCarousel (): Promise<T.Group> {
  const { scene } = await new GLTFLoader().loadAsync("/items/mgr/carousel.glb")
  const material = new T.MeshPhysicalMaterial({
    metalness: 0.9,
    roughness: 0.05,
    envMapIntensity: 0.9,
    clearcoat: 1,
    transparent: true,
    // transmission: .95,
    opacity: 0.7,
    reflectivity: 0.2,
    refractionRatio: 0.985,
    ior: 0.9,
    side: T.BackSide,
  })

  scene.traverse((c) => {
    if (c instanceof T.Mesh) { c.material = material }
  })

  scene.position.y = -3

  return scene
}
