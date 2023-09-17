import * as T from "three"

const z = 2
let xCoef: number
let yCoef: number
let camera: T.Camera
let light: T.PointLight

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

function moveBulb (x: number, y: number) {
  x = xCoef * x - 1
  y = yCoef * y + 1

  const vec = new T.Vector3(x, y, z)
  vec.unproject(camera)
  const dir = vec.sub(camera.position).normalize()
  const dis = -camera.position.z / dir.z
  const pos = camera.position.clone().add(dir.multiplyScalar(dis))

  light.position.set(pos.x, pos.y, z)
}

const onPointermove = (e: PointerEvent) =>
  moveBulb(e.clientX, e.clientY)

const onTouchmove = (e: TouchEvent) => {
  moveBulb(e.touches[0].clientX, e.touches[0].clientY)
}

export function getBulb (w: number, h: number,
  c: T.Camera, shadows: boolean): T.PointLight {
  xCoef = 2 / w
  yCoef = -2 / h
  camera = c

  const geometry = new T.SphereGeometry(0.1)
  const material = new T.MeshLambertMaterial({ emissive: 0xFFFFFF })
  const mesh = new T.Mesh(geometry, material)

  light = new T.PointLight(0xFFFFFF, 1, 20, 2)
  light.position.set(0, 0, z)
  if (shadows) { light.castShadow = true }
  light.add(mesh)

  if (isTouchDevice) {
    window.addEventListener("touchmove", onTouchmove)
  } else {
    window.addEventListener("pointermove", onPointermove)
  }

  return light
}

export function removeLightEvents (): void {
  if (isTouchDevice) {
    window.removeEventListener("touchmove", onTouchmove)
  } else {
    window.removeEventListener("pointermove", onPointermove)
  }
}
