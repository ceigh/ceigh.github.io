import * as T from 'three'

export function getHeart (): T.Group {
  const shape = new T.Shape()

  shape.moveTo(25, 25)
  shape.bezierCurveTo(25, 25, 20, 0, 0, 0)
  shape.bezierCurveTo(-30, 0, -30, 35, -30, 35)
  shape.bezierCurveTo(-30, 55, -10, 77, 25, 95)
  shape.bezierCurveTo(60, 77, 80, 55, 80, 35)
  shape.bezierCurveTo(80, 35, 80, 0, 50, 0)
  shape.bezierCurveTo(35, 0, 25, 25, 25, 25)

  const extrudeSettings = {
    curveSegments: 128,
    depth: 16,
    bevelSegments: 32,
    bevelThickness: 16
  }
  const geometry = new T.ExtrudeGeometry(shape, extrudeSettings)
  const material = new T.MeshPhongMaterial({
    color: 0x222222,
    shininess: 128
  })
  const mesh = new T.Mesh(geometry, material)

  mesh.scale.set(0.02, 0.02, 0.02)
  mesh.rotation.x = Math.PI

  mesh.position.y = -3
  const box = new T.Box3().setFromObject(mesh)
  box.getCenter(mesh.position)
  mesh.position.multiplyScalar(-1)
  const pivot = new T.Group()
  pivot.add(mesh)

  mesh.castShadow = true

  return pivot
}

export async function getFloor (): Promise<T.Mesh> {
  const texture = await new T.TextureLoader()
    .loadAsync('/images/textures/floor.jpg')
  texture.repeat.set(5, 5)
  texture.wrapT = T.RepeatWrapping
  texture.wrapS = T.RepeatWrapping

  const geometry = new T.PlaneBufferGeometry(50, 50)
  const material = new T.MeshPhysicalMaterial({
    map: texture,
    roughness: 0.3,
    clearcoat: 1
  })
  const mesh = new T.Mesh(geometry, material)

  mesh.position.set(0, 0, 0)
  mesh.rotation.x = -Math.PI / 2
  mesh.receiveShadow = true

  return mesh
}
