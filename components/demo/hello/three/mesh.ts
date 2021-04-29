import * as T from 'three'

export function getKitties (): T.Mesh {
  const rows = 5
  const cols = 2 * rows
  const count = rows * cols
  const offsetX = (cols - 1) / 2
  const offsetY = (rows - 1) / 2

  const geometry = new T.SphereGeometry(0.5)
  const material = new T.MeshLambertMaterial()
  const mesh = new T.InstancedMesh(geometry, material, count)

  const matrix = new T.Matrix4()
  let i = 0

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      matrix.setPosition(offsetX - c, offsetY - r, 0)
      mesh.setMatrixAt(i, matrix)
      // mesh.setColorAt(i, new T.Color(Math.random() * 0xFFFFFF))
      i++
    }
  }

  // mesh.scale.set(2, 2, 2)
  return mesh
}
