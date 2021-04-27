import * as T from 'three'

const raycaster = new T.Raycaster()
const mouse = new T.Vector2()
let width: number
let height: number
let isOnIceberg = false
let icebergGroup: T.Group

function handleMove (e: MouseEvent) {
  mouse.x = 2 * e.clientX / width - 1
  mouse.y = -2 * e.clientY / height + 1
}

function handleUp () {
  if (!isOnIceberg) { return }
  const color = Math.random() * 0xFFFFFF
  icebergGroup.traverse((c) => {
    if (c instanceof T.Mesh) { c.material.color.set(color) }
  })
}

export function getUpdateRaycaster (w: number, h: number,
  camera: T.Camera, scene: T.Scene, iceberg: T.Group): Function {
  width = w
  height = h
  icebergGroup = iceberg

  window.addEventListener('pointermove', handleMove)
  window.addEventListener('pointerup', handleUp)

  return () => {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children, true)
    isOnIceberg = intersects.some(i => /iceberg/.test(i.object.name))
  }
}

export function stopRaycaster () {
  window.removeEventListener('pointermove', handleMove)
  window.removeEventListener('pointerup', handleUp)
}
