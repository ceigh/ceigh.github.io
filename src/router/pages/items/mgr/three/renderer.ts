import * as T from "three"

export function getRenderer (w: number, h: number): T.WebGLRenderer {
  const renderer = new T.WebGLRenderer({ antialias: true })

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(w, h)

  return renderer
}
