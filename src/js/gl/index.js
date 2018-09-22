import Regl from 'regl'
import loop from 'raf-loop'
import { FPS_I, MAX_MEDIA_INPUTS } from 'common/constants'
import { fillScreen } from 'utils'
import Model from './models'
import SingleDraw from 'gl/glsl/single'
import DoubleDraw from 'gl/glsl//double'
import TripleDraw from 'gl/glsl//triple'

const REGL = (canvas, options, setDispatchHandlers) => {
  const regl = Regl({
    canvas: canvas,
    attributes: { stencil: true, preserveDrawingBuffer: true },
  })
  const textures = []
  let sources = []
  let drawMode = 0

  const drawSingle = SingleDraw(regl)
  const drawDouble = DoubleDraw(regl)
  const drawTriple = TripleDraw(regl)

  Model.setDispatchHandlers(setDispatchHandlers)
  Model.store.on('inputs', (inputs, prev) => {
    sources = inputs
    if(inputs.length !== prev){
      destroyTextures()
    }
    inputs.forEach((el, i) => {
      if (textures[i]) {
        textures[i].destroy()
      }
      textures[i] = createNewTexture(el)
    })
    drawMode = sources.length
  })


  function resize() {
    fillScreen(canvas)
  }


  const createNewTexture = src =>
    regl.texture({
      format: 'rgba',
      width: options.width,
      height: options.height,
      type: 'uint8',
      mag: 'nearest',
      min: 'nearest',
      wrapS: 'clamp',
      wrapT: 'clamp',
      data: src,
    })

  function destroyTextures() {
    textures.forEach(tex => tex.destroy())
    textures.length = 0
  }

  function addSource(src) {
    textures.push(createNewTexture(src))
  }

  function update() {
    for (var i = 0; i < textures.length; i++) {
      textures[i].subimage(sources[i])
    }
  }

  function update() {
    for (var i = 0; i < textures.length; i++) {
      textures[i].subimage(sources[i])
    }
  }

  function draw() {
    regl.clear({
      color: [0.1, 0.1, 0.1, 1],
      depth: true,
      stencil: false,
    })
    update()
    if (drawMode === 1) {
      drawSingle({
        tex0: textures[0],
      })
    } else if (drawMode === 2) {
      drawDouble({
        tex0: textures[Model.getTextureIndexAt(0)],
        tex1: textures[Model.getTextureIndexAt(1)],
        xFlips: [0, 1, 0, 0],
        tolerance: 0.5,
        slope: 0.2,
      })
    } else if (drawMode === 3) {
      drawTriple({
        tex0: textures[Model.getTextureIndexAt(0)],
        tex1: textures[Model.getTextureIndexAt(1)],
        tex2: textures[Model.getTextureIndexAt(2)],
        xFlips: [0, 1, 1, 0],
        tolerance: 0.5,
        slope: 0.2,
      })
    }
  }

  function read() {
    return regl.read(new Uint8Array(WIDTH * HEIGHT * 4))
  }

  let _time = 0
  const raf = loop(function(tick) {
    let n = performance.now()
    if (n - _time >= FPS_I && drawMode > 0) {
      draw()
      _time = n
    }
  })

  function start() {
    if(!raf.running){
      raf.start()
    }
  }

  regl.clear({
    color: [0.1, 0.1, 0.1, 1],
    depth: true,
    stencil: false,
  })

  fillScreen(canvas)

  window.addEventListener('resize', resize)
  return {
    start,
    addSource
  }
}

export default REGL
