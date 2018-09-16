import { AppEmitter } from 'common/emitters'
import { override } from 'core-decorators'
import { qs, createVideoElFromFile, destroyVideoEl } from 'utils'
import { MEDIA_TYPES, LOCAL_VIDEO_ID, CANVAS_OUTPUT_ID } from 'common/constants'
import { M_INPUT_NEW } from 'common/events'
import observable from 'proxy-observable'
import BaseModel from './base'
import Keyboard from './keyboard'
import Streams from 'gl/streams'
import Picker from 'utils/picker'

class MODEL extends BaseModel {
  constructor(props) {
    super(props)
    this.store = observable({
      ...props,
      activeNumInputs: 0,
      keyboard: Keyboard.store,
      inputs: [],
      activeVideoTypes: ['webcam', 'canvas'],
    })

    this.streams = new Streams()

    AppEmitter.on(M_INPUT_NEW, obj => {
      const { type, index, files } = obj
      switch (type) {
        case MEDIA_TYPES.webcam: {
          return this.addSourceEl(qs(`#${LOCAL_VIDEO_ID}`), index)
        }
        case MEDIA_TYPES.canvas: {
          const v = this.streams.createCanvasStreamEl(qs(`#${CANVAS_OUTPUT_ID}`))
          return this.addSourceEl(v, index)
        }
        case MEDIA_TYPES.file: {
          return this.addSourceEl(createVideoElFromFile(files[0]), index)
          //return this.addSourceEl(qs(`#${LOCAL_VIDEO_ID}`), index)
        }
        case MEDIA_TYPES.remove: {
          return this.removeSourceElAt(index)
        }
      }
      // this.addSourceEl(createVideoElFromFile(obj.file[0]))
    })
  }

  addSourceEl(videoEl, index = -1) {
    const _self = this
    function _onload(e) {
      e.target.setAttribute('crossorigin', 'anonymous')
      e.target.removeEventListener('loadeddata', _onload)
      const inputs = [..._self.store.inputs]
      if (index === -1) {
        index = inputs.length
      }
      inputs[index] = videoEl
      //!!
      _self.store.activeNumInputs = inputs.filter(el => !!el).length

      _self.store.inputs = inputs
    }
    if (videoEl.readyState < 4) {
      videoEl.addEventListener('loadeddata', _onload)
    } else {
      _onload({
        target: videoEl,
      })
    }
  }

  removeSourceElAt(index) {
    const inputs = this.store.inputs
    var sourceEl = inputs.splice(index, 1)
    destroyVideoEl(sourceEl[0])
    this.store.inputs = inputs
  }

  @override
  setDispatchHandlers(dispatchHandlers) {
    super.setDispatchHandlers(dispatchHandlers)
    Keyboard.setDispatchHandlers(dispatchHandlers)
  }

  getTextureIndexAt(i) {
    return Keyboard.store.textureIndexs[i]
  }
}
export default new MODEL()
