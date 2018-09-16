import { WIDTH, HEIGHT, FPS_I } from 'common/constants'
import { isBoolean, isNil } from 'lodash';
import CONFIG from 'common/config'
import { cover, contain } from 'intrinsic-scale'

export const qs = (string, el = document) => el.querySelector(string)
export const qsAll = (string, el = document) => el.querySelectorAll(string)

export const fillScreen = (el, options = { w: 640, h: 480, cover: true }) => {
  const { w, h } = options
  let { width, height, x, y } = options.cover
    ? cover(window.innerWidth, window.innerHeight, w, h)
    : contain(window.innerWidth, window.innerHeight, w, h)
  const scale = Math.max(width / w, height / h)

  el.style.transform = `scale3d(${scale},${scale},1) translate3d(0, 0, 0)`
  el.style.webkitTransform = `scale3d(${scale},${scale},1) translate3d(0,0, 0)`
  el.style.top = `${y / 2}px`
  el.style.left = `${x / 2}px`
}

export const createVideo = (width, height) => {
  const v = document.createElement('video')
  v.setAttribute('crossorigin', 'anonymous')
  v.setAttribute('autoplay', true)
  v.setAttribute('muted', true)
  v.volume = 0
  v.width = width
  v.height = height
  return v
}

export const createVideoElFromStream = (stream, { width = WIDTH, height = HEIGHT } = {}) => {
  const v = createVideo(width, height)
  v.srcObject = stream
  return v
}

export const createVideoElFromFile = (file, { width = WIDTH, height = HEIGHT } = {}) => {
  const v = createVideo(width, height)
  if (CONFIG.videoPlayback.loop) {
    v.setAttribute('loop', true)
  }
  v.src = URL.createObjectURL(file)
  return v
}

export const destroyVideoEl = v => {
  if(v.srcObject){
    v.srcObject.getTracks().forEach(track => track.stop());
    v.srcObject = null
  }else if(v.src){
    URL.revokeObjectURL(v.src)
  }
  v.remove()
  v = null
}

export const isEnvTrue = key => {
  return isBoolean(Boolean(process.env[key])) ? process.env[key] == 'true' : !isNil(process.env[key]);
};

