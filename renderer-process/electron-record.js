const { ipcMain } = require('electron')
const remote = require('electron').remote
const path = require('path')
const createVideoRecorder = require('./record')

let win, output
/*
window.RECORDER = {
  start: function() {
    // First we grab a reference to the current window object
    win = remote.getCurrentWindow()
    videp = createVideoRecorder(win, {
      fps: 18,
    })
    video.frame(window.RECORDER.render)
  },
  render: function() {
    video.frame(window.RECORDER.render)
  },
}


ipcMain.on("render:start", (event, arg) => {
    console.log(arg)
  })

*/

global.EAPI = {
  startRender: function(name, args) {
    win = remote.getCurrentWindow()
    video = createVideoRecorder(win, {
      fps: 18,
      format: 'flv',
    })
    video.start()
  },
  /*showItemInFolder: (path) => {
    return shell.showItemInFolder(path)
  },
  videoSaved:(path)=>{
    ipcRenderer.send('videoSaved', path)
  },
  renderCanvas:(data)=>{
    console.log(data.byteLength);
    ipcRenderer.send('canvas-render', data)
  },
  onIsReady:(isReady=>{
    ipcRenderer.send('is-ready', isReady)
  })*/
}
