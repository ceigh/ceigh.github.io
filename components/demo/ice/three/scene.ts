import * as T from 'three'

export async function getScene (renderer: T.WebGLRenderer):
Promise<T.Scene> {
  const scene = new T.Scene()
  const texture = await new T.TextureLoader()
    .loadAsync('/images/textures/arctic.png')

  const rt = new T.WebGLCubeRenderTarget(texture.image.height)
  rt.fromEquirectangularTexture(renderer, texture)
  scene.background = rt.texture

  return scene
}
