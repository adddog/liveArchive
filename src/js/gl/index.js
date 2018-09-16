import Regl from 'regl'
import loop from 'raf-loop'
import { FPS_I, MAX_MEDIA_INPUTS } from 'common/constants'
import { fillScreen } from 'utils'
import Model from './models'
import Picker from 'utils/picker'
import SingleDraw from 'gl/glsl/single'
import DoubleDraw from 'gl/glsl//double'
import TripleDraw from 'gl/glsl//triple'

const REGL = (canvas, options, setDispatchHandlers) => {
  if (!Detector.isDesktop) return

  const regl = Regl({
    canvas: canvas,
    attributes: { stencil: true, preserveDrawingBuffer: true },
  })

  Picker.start(regl, { width: options.width, height: options.height })

  const textures = []
  let sources = []
  let drawMode = 0

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

  const drawSingle = SingleDraw(regl)
  const drawDouble = DoubleDraw(regl)
  const drawTriple = TripleDraw(regl)

  function destroyTextures() {
    textures.forEach(tex => tex.destroy())
    textures.length = 0
  }

  /*function createTextures(srcs) {
    sources = srcs.map(src => ({
      data: src,
      isReady: src.readyState >= 4,
    }))
    destroyTextures()
    textures = sources.map(src => createNewTexture(src))
    srcs.forEach((src, i) => {
      function _onload(e) {
        e.target.setAttribute("crossorigin", "anonymous")
        e.target.removeEventListener("loadeddata", _onload)
        sources[i].isReady = true
        if (
          sources.filter(({ isReady }) => isReady).length ===
          sources.length
        ) {
          raf.start()
        }
      }
      src.addEventListener("loadeddata", _onload)
    })
  }*/

  function addSource(src) {
    textures.push(createNewTexture(src))
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
        tex0: textures[Model.getTextureIndexAt(0)],
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

  function start() {}

  let _time = 0
  const raf = loop(function(tick) {
    let n = performance.now()
    if (n - _time >= FPS_I && textures.length > 0) {
      draw()
      _time = n
    }
  }).start()

  function resize() {
    // fillScreen(canvas)
  }

  regl.clear({
    color: [0.1, 0.1, 0.1, 1],
    depth: true,
    stencil: false,
  })

  window.addEventListener('resize', resize)

  /*var v = streams.createCanvasStream(canvas)
  document.body.appendChild(v)
  v.addEventListener("loadeddata", e => {
    //textures.push(createNewTexture(v));
  })*/
  //console.log(streams.createCanvasStream(canvas));
  //textures.push(createNewTexture());

  return {
    drawSingle,
    model: Model,
    start,
    resize,
  }
}

export default REGL
