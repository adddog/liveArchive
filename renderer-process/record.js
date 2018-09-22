var spawn = require('child_process').spawn
var exec = require('child_process').exec
var loop = require('raf-loop')

module.exports = createMovieRecorderStream

function createMovieRecorderStream(win, options_) {
  var options = options_ || {}

  if (!win) {
    throw new Error('electron-animator: you must specify a BrowserWindow')
  }

  var ffmpegPath = options.ffmpeg || 'ffmpeg'
  var fps = options.fps || 60
  const FPS_I = 1000 / fps

  var args = [
    '-y',
    '-re',
    '-f',
    'image2pipe',
    '-r',
    '' + +fps,
    // we use jpeg here because the most common version of ffmpeg (the one
    // that ships with homebrew) is broken and crashes when you feed it PNG data
    //  https://trac.ffmpeg.org/ticket/1272
    '-vcodec',
    'png',
    '-s',
    '642x458',
    '-i',
    '-',
    //'/Volumes/Fatboy/Work/liveArchive/dist/media/fb.mp4',
    '-movflags',
    '+faststart',
    '-preset',
    'ultrafast',
    '-r',
    '30',
    '-tune',
    'zerolatency',
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    '-b:v',
    '600k',
    '-crf',
    '30',
    '-minrate',
    '300k',
    '-maxrate',
    '600k',
    '-bufsize',
    '1200k',
    '-an',
    /*"-analyzeduration",
    "512",
    "-probesize",
    "128",*/
    '-f',
    'mpegts',
  ]

  var outFile = options.output

  if (outFile) {
    args.push(outFile)
  } else {
    args.push('"udp://192.168.1.134:7777"')
  }

  //var ffmpeg = exec(ffmpegPath, args)
  console.log('Command:')
  console.log(`${ffmpegPath} ${args.join(' ')}`)
  var ffmpeg = exec(`${ffmpegPath} ${args.join(' ')}`)

  let _time = 0
  function appendFrame() {
    // This is dumb, but sometimes electron's capture fails silently and returns
    // an empty buffer instead of an image.  When this happens we can retry and
    // usually it works the second time.

    let n = performance.now()
    if (n - _time >= FPS_I) {
      console.log('here')
      try {
        win.capturePage(function(image) {
          var jpeg = image.toPNG(90)
          if (jpeg.length === 0) {
            // setTimeout(tryCapture, 10)
          } else {
            console.log(jpeg.buffer.length)
            ffmpeg.stdin.write(jpeg.buffer, function(err) {
              _time = n
              appendFrame()
            })
          }
        })
      } catch (err) {}
      appendFrame()
    }
  }

  function endMovie() {
    ffmpeg.stdin.end()
  }

  function start() {
    const raf = loop(function(tick) {
      let n = performance.now()
      if (n - _time >= FPS_I) {
        win.capturePage(function(image) {
          var jpeg = image.toPNG(90)
          if (jpeg.length === 0) {
            // setTimeout(tryCapture, 10)
          } else {
            ffmpeg.stdin.write(Buffer.from(jpeg.buffer), function(err) {})
          }
        })
        _time = n
      }
    }).start()
  }

  var result = {
    start: start,
    frame: appendFrame,
    end: endMovie,
    log: ffmpeg.stderr,
  }

  if (!outFile) {
    result.stream = ffmpeg.stdout
  }

  return result
}
