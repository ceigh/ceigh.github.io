import * as T from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const sizes = [[2, 3], [5, 10]]

export async function getKitties (w: number, h: number,
  size: 0 | 1, shadows: boolean): Promise<T.Object3D> {
  const [rowsMax, colsMax] = sizes[size]
  const [rowsRaw, colsRaw] = [Math.ceil(h / 140), Math.ceil(w / 130)]
  const rows = rowsRaw > rowsMax ? rowsMax : rowsRaw
  const cols = colsRaw > colsMax ? colsMax : colsRaw

  const count = rows * cols
  const offsetX = (cols - 1) / 2
  const offsetY = (rows - 1.8) / 2

  const glb = await new GLTFLoader().loadAsync('/objects/kitty.glb')
  const kitty = glb.scene.children[0] as T.Mesh
  const defaultTransform = new T.Matrix4()
    .makeRotationY(Math.PI / 2)
    .multiply(new T.Matrix4().makeScale(0.03, 0.03, 0.03))
  kitty.geometry.applyMatrix4(defaultTransform)

  const { geometry } = kitty
  const material = new T.MeshPhongMaterial({ shininess: 100 })
  const mesh = new T.InstancedMesh(geometry, material, count)
  if (shadows) {
    mesh.castShadow = true
    mesh.receiveShadow = true
  }

  const matrix = new T.Matrix4()
  const colors = [0xFD7293, 0xC6000F, 0xFEFEFE, 0x5FDAD5]
    .map(c => new T.Color(c))
  let i = 0

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seed = Math.random()
      const color = colors[Math.floor(seed * colors.length)]
      const z = seed - 0.5
      mesh.setColorAt(i, color)
      matrix.setPosition(2.5 * (offsetX - c), 3 * (offsetY - r), z)
      mesh.setMatrixAt(i, matrix)
      i++
    }
  }

  return mesh
}
