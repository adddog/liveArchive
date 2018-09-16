import { WIDTH, HEIGHT, FPS_I } from "common/constants"

class CONFIG {
  constructor() {
    this._width = WIDTH
    this._height = HEIGHT
    this._fps = FPS_I

    this.videoPlayback = {
      loop:true
    }
  }

  update(ctx = {}) {
    for (const key in ctx) {
      if (this[key]) {
        this[key] = ctx[key]
      }
    }
  }

  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  get fps() {
    return this._fps
  }

  set width(v) {
    this._width = v
  }

  set height(v) {
    this._height = v
  }

  set fps(v) {
    this._fps = v
  }
}

export default new CONFIG()
