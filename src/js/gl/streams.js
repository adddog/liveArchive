import CONFIG from 'common/config'
import { createVideoElFromStream} from "utils"

export default class Streams {
  constructor(options) {
    this._canvasStreams = new Map()
  }

  createCanvasStreamEl(
    el,
    options = {
      fps: CONFIG.fps,
      width: CONFIG.width,
      height: CONFIG.height,
    },
  ) {
    const v = createVideoElFromStream(el.captureStream(options.fps))
    if (this._canvasStreams.has(el)) {
      return v
    }
    this._canvasStreams.set(el, v)
    return v
    /*const v = document.createElement("video");
    v.setAttribute("autoplay", "true")
    v.setAttribute("crossorigin", "anonymous")
    v.width = options.width || CONFIG.width;
    v.height = options.height || CONFIG.height;
    v.srcObject = stream;
    return v;*/
  }
}
