import * as T from 'three'

export function getScene (renderer: T.WebGLRenderer): T.Scene {
  const scene = new T.Scene()
  // const color = 0xFFFFFF

  // scene.fog = new T.FogExp2(color, 0.0005)
  // scene.background = new T.Color(color)
  const texture = new T.TextureLoader()
    .load('/images/textures/arctic.png', () => {
      const rt = new T.WebGLCubeRenderTarget(texture.image.height)
      rt.fromEquirectangularTexture(renderer, texture)
      scene.background = rt.texture
    })

  return scene
}
