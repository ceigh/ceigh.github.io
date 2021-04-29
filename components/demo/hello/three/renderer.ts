import * as T from 'three'

export function getRenderer (w: number, h: number,
  shadows: boolean): T.WebGLRenderer {
  const renderer = new T.WebGLRenderer({ antialias: true })

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(w, h)
  if (shadows) { renderer.shadowMap.enabled = true }
  renderer.shadowMap.type = T.PCFSoftShadowMap

  return renderer
}
