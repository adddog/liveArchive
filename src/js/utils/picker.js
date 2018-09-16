// import dragDrop from "drag-drop"
// import { throttle, mean } from "lodash"
// import { cover, contain } from "intrinsic-scale"
// import AppEmitter from "common/emitter"
// import { IS_DEV, WIDTH, HEIGHT } from "common/constants"

// const SAMPLE_AMOUNT = 8

// const getAverageColor = (data, width, x, y) => {
//   const colors = [
//     [
//       data[(y * width + x) * 4],
//       data[(y * width + x) * 4 + 1],
//       data[(y * width + x) * 4 + 2],
//     ],
//     [
//       data[(y * width + (x - 1)) * 4], //LEFT
//       data[(y * width + (x - 1)) * 4 + 1],
//       data[(y * width + (x - 1)) * 4 + 2],
//     ],
//     [
//       data[((y - 1) * width + x) * 4], //TOP
//       data[((y - 1) * width + x) * 4 + 1],
//       data[((y - 1) * width + x) * 4 + 2],
//     ],
//     [
//       data[(y * width + (x + 1)) * 4], //RIGHT
//       data[(y * width + (x + 1)) * 4 + 1],
//       data[(y * width + (x + 1)) * 4 + 2],
//     ],
//     [
//       data[((y + 1) * width + x) * 4], //BOTTOM
//       data[((y + 1) * width + x) * 4 + 1],
//       data[((y + 1) * width + x) * 4 + 2],
//     ],
//     [
//       data[((y + 1) * width + (x - 1)) * 4], //BOTTOM LEFT
//       data[((y + 1) * width + (x - 1)) * 4 + 1],
//       data[((y + 1) * width + (x - 1)) * 4 + 2],
//     ],
//     [
//       data[((y - 1) * width + (x - 1)) * 4], //TOP LEFT
//       data[((y - 1) * width + (x - 1)) * 4 + 1],
//       data[((y - 1) * width + (x - 1)) * 4 + 2],
//     ],
//     [
//       data[((y + 1) * width + (x + 1)) * 4], //BOTTOM RIGHT
//       data[((y + 1) * width + (x + 1)) * 4 + 1],
//       data[((y + 1) * width + (x + 1)) * 4 + 2],
//     ],
//     [
//       data[((y - 1) * width + (x + 1)) * 4], //TOP RIGHT
//       data[((y - 1) * width + (x + 1)) * 4 + 1],
//       data[((y - 1) * width + (x + 1)) * 4 + 2],
//     ],
//   ]
//   return [
//     Math.round(mean(colors.map(v => v[0]))),
//     Math.round(mean(colors.map(v => v[1]))),
//     Math.round(mean(colors.map(v => v[2]))),
//   ]
// }

// const DesktopInteraction = (webrtc, sourceEl) => {
//   const canvasOff = document.createElement("canvas")
//   canvasOff.width = WIDTH
//   canvasOff.height = HEIGHT
//   const ctx = canvasOff.getContext("2d")
//   canvasOff.classList.add("canvas", "no-interaction")
//   canvasOff.style.display = "none"

//   if (IS_DEV) {
//     document.body.appendChild(canvasOff)
//   }

//   window.addEventListener("click", e => {
//     let { width, height, x, y } = cover(
//       window.innerWidth,
//       window.innerHeight,
//       WIDTH,
//       HEIGHT
//     )

//     width = Math.floor(width)
//     height = Math.floor(height)

//     canvasOff.width = width
//     canvasOff.height = height
//     canvasOff.style.top = `${y / 2}px`
//     canvasOff.style.left = `${x / 2}px`
//     canvasOff.style.width = `${width}px`
//     canvasOff.style.height = `${height}px`

//     ctx.drawImage(sourceEl, 0, 0, WIDTH, HEIGHT, 0, 0, width, height)

//     let frame = ctx.getImageData(0, 0, width, height)
//     const clickX = e.pageX + Math.abs(Math.round(x / 2))
//     const clickY = e.pageY + Math.abs(Math.round(y / 2))

//     const color = getAverageColor(frame.data, width, clickX, clickY)

//     /*if (IS_DEV) {
//       canvasOff.style.display = "block"
//       frame.data[(clickY * width + clickX) * 4] = 0
//       frame.data[(clickY * width + clickX) * 4 + 1] = 255
//       frame.data[(clickY * width + clickX) * 4 + 2] = 0
//       ctx.putImageData(frame, 0, 0)
//       setTimeout(() => {
//         canvasOff.style.display = "none"
//       }, 1000)
//     }*/

//     AppEmitter.emit("addKeyColor", {
//       color,
//       position: {
//         x: e.pageX / window.innerWidth,
//         y: e.pageY / window.innerHeight,
//       },
//     })
//   })
//   //****************
//   //DRAAG DROP
//   //****************

//   let _onFileDropped
//   const _onFileLoaded = e => {
//     e.target.removeEventListener("load", _onFileLoaded)
//     if (_onFileDropped) {
//       _onFileDropped(URL.createObjectURL(new Blob([e.target.result])))
//       e.target = null
//     }
//   }

//   const _onFileError = e => {
//     e.target.removeEventListener("error", _onFileError)
//     e.target = null
//     console.error("FileReader error" + e)
//   }

//   // You can pass in a DOM node or a selector string!
//   dragDrop(document.body, function(files) {
//     console.log("Here are the dropped files", files)

//     // `files` is an Array!
//     files.forEach(function(file) {
//       /*console.log(file.name)
//       console.log(file.size)
//       console.log(file.type)
//       console.log(file.lastModifiedData)
//       console.log(file.fullPath)*/

//       let reader = new FileReader()
//       reader.addEventListener("load", _onFileLoaded)
//       reader.addEventListener("error", _onFileError)
//       reader.readAsArrayBuffer(file)
//     })
//   })

//   function setOnFileDropped(cb) {
//     _onFileDropped = cb
//   }

//   window.addEventListener(
//     "mousemove",
//     throttle(
//       e => AppEmitter.emit("mousemove", { x: e.pageX, y: e.pageY }),
//       100
//     )
//   )

//   let _commString = ""
//   let _commTo
//   const onKeyUp = e => {
//     clearTimeout(_commTo)
//     if (e.keyCode === 13) {
//       _commString = ""
//     } else if (e.keyCode === 8) {
//       _commString = _commString.substring(0, _commString.length - 1)
//     } else {
//       _commString += String.fromCharCode(e.keyCode)
//     }
//     _commTo = setTimeout(function() {
//       _commString = ""
//       AppEmitter.emit("desktop:communcation", _commString)
//     }, 4000)
//     AppEmitter.emit("desktop:communcation", _commString)
//   }

//   function addKeyboardCommunication() {
//     window.addEventListener("keyup", onKeyUp)
//   }

//   function removeKeyboardCommunication() {
//     window.removeEventListener("keyup", onKeyUp)
//   }

//   return {
//     setOnFileDropped,
//     addKeyboardCommunication,
//     removeKeyboardCommunication,
//   }
// }

// export default DesktopInteraction
import { cover, contain } from 'intrinsic-scale'
import { autobind } from 'core-decorators'
import { WIDTH, HEIGHT, FPS_I } from 'common/constants'
class PICKER {
  constructor({ width = WIDTH, height = HEIGHT } = {}) {
    /*const canvasOff = document.createElement("canvas")
    canvasOff.width = width
    canvasOff.height = height
    const ctx = canvasOff.getContext("2d")
    canvasOff.style.display = "none"

    window.addEventListener("click", e => {

    let { width, height, x, y } = cover(
      window.innerWidth,
      window.innerHeight,
      WIDTH,
      HEIGHT
    )

    width = Math.floor(width)
    height = Math.floor(height)

    canvasOff.width = width
    canvasOff.height = height
    canvasOff.style.top = `${y / 2}px`
    canvasOff.style.left = `${x / 2}px`
    canvasOff.style.width = `${width}px`
    canvasOff.style.height = `${height}px`

    ctx.drawImage(sourceEl, 0, 0, WIDTH, HEIGHT, 0, 0, width, height)

    let frame = ctx.getImageData(0, 0, width, height)
    const clickX = e.pageX + Math.abs(Math.round(x / 2))
    const clickY = e.pageY + Math.abs(Math.round(y / 2))

    const color = getAverageColor(frame.data, width, clickX, clickY)

    AppEmitter.emit("addKeyColor", {
      color,
      position: {
        x: e.pageX / window.innerWidth,
        y: e.pageY / window.innerHeight,
      },
    })
  })*/
  }

  start(regl, { width, height } = {}) {
    this.width = width
    this.height = height
    this.regl = regl
    window.addEventListener('click', this._onClick)
  }

  stop() {
    window.removeEventListener('click', this._onClick)
  }

  @autobind
  _onClick(e) {
    let { width, height, x, y } = cover(this.width, this.height, window.innerWidth, window.innerHeight)
    const s = Math.min(this.width / window.innerWidth, this.height / window.innerHeight)
    const maxW = window.innerWidth * s;
    const maxH = window.innerHeight * s;
    /*const clickX =  Math.round(e.pageX * s) + (this.width - maxW) / 2
    const clickY = Math.round(e.pageY * s) + (this.height - maxH) / 2*/
    //width = Math.floor(width)
    //height = Math.floor(height)
    const clickX = e.pageX
    const clickY = e.pageY
    var pixels = this.regl.read({
      x: clickX,
      y: clickY,
      width: 1,
      height: 1,
      data: new Uint8Array(4),
    })
    return pixels
    console.log(pixels)

    /*const clickX = e.pageX + Math.abs(Math.round(x / 2))
    const clickY = e.pageY + Math.abs(Math.round(y / 2))
    let frame = this.sourceEl.getImageData(0, 0, this.width, this.height)
    const color = getAverageColor(frame.data, this.width, clickX, clickY)
    console.log(color)*/
  }

  getAverageColor(sourceEl, width, height) {
    const clickX = e.pageX + Math.abs(Math.round(x / 2))
    const clickY = e.pageY + Math.abs(Math.round(y / 2))

    if (sourceEl.tagName === 'CANVAS') {
    }
    console.log(sourceEl)
    console.log(sourceEl.tagName)
    // return getAverageColor(frame.data, width, clickX, clickY)
  }
}

export default new PICKER()
