import * as T from "three"

export function getRenderer (w: number, h: number): T.WebGLRenderer {
  const renderer = new T.WebGLRenderer({ antialias: true })
  renderer.setSize(w, h)

  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = T.PCFSoftShadowMap

  return renderer
}
