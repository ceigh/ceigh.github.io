import * as T from 'three'

let xCoef: number
let yCoef: number
let camera: T.Camera
let light: T.PointLight

function onMove (e: PointerEvent): void {
  const x = xCoef * e.clientX - 1
  const y = yCoef * e.clientY + 1

  const vec = new T.Vector3(x, y, 2)
  vec.unproject(camera)
  const dir = vec.sub(camera.position).normalize()
  const dis = -camera.position.z / dir.z
  const pos = camera.position.clone().add(dir.multiplyScalar(dis))

  light.position.set(pos.x, pos.y, 2)
}

export function getBulb (w: number, h: number, c: T.Camera): T.PointLight {
  xCoef = 2 / w
  yCoef = -2 / h
  camera = c

  const geometry = new T.SphereGeometry(0.1)
  const material = new T.MeshLambertMaterial({ emissive: 0xFFFFFF })
  const mesh = new T.Mesh(geometry, material)

  light = new T.PointLight(0xFFFFFF, 1, 20, 2)
  light.position.set(0, 0, 2)
  light.add(mesh)

  window.addEventListener('pointermove', onMove)

  return light
}

export function removeLightEvents (): void {
  window.removeEventListener('pointermove', onMove)
}
