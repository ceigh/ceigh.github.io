import * as T from 'three'

let w: number
let h: number
let light: T.PointLight

function onMove (e: PointerEvent): void {
  const x = 2 * e.clientX / w - 1
  const y = -2 * e.clientY / h + 1
  light.position.set(x, y, 2)
}

export function getLights (width: number, height: number): T.Light[] {
  w = width
  h = height
  light = new T.PointLight(0xFFFFFF, 1, 20, 4)
  light.position.set(0, 0, 2)

  window.addEventListener('pointermove', onMove)

  return [light]
}

export function removeLightEvents (): void {
  window.removeEventListener('pointermove', onMove)
}
