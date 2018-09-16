import { autobind } from 'core-decorators'
import observable from 'proxy-observable'
import BaseModel from './base'

export const INIT_TEXTURE_INDEXS= [0, 1, 2]
const SOURCE_KEYCODES = [65, 66, 67, 68] // a,b,c
const TEXTURE_KEYCODES = [49, 50, 51, 52] //1,2,3

class Keyboard extends BaseModel{
  constructor(props) {
    super(props)
    // this.map = new Map([['a', '0'], ['b', '1'], ['c', '2']])
    this._selectedSourceIndex = 0
    this.store = observable({
      textureIndexs: INIT_TEXTURE_INDEXS,
    })

    window.addEventListener('keyup', this.onKeyUp)
  }

  @autobind
  onKeyUp(e) {
    const i = SOURCE_KEYCODES.indexOf(e.keyCode)
    this._selectedSourceIndex = i > -1 ? i : this._selectedSourceIndex

    const j = TEXTURE_KEYCODES.indexOf(e.keyCode)
    if (j > -1) {
      const c = [...this.store.textureIndexs]
      c[this._selectedSourceIndex] = j
      this.store.textureIndexs = c
      this.dispatchHandlers.keyboardUpdate(c)
    }
  }
}

export default  new Keyboard()