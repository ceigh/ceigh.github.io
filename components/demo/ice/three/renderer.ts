import { WebGLRenderer, PCFSoftShadowMap } from 'three'

export function getRenderer (w: number, h: number): WebGLRenderer {
  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(w, h)

  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap

  return renderer
}
