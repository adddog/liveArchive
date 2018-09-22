"use strict"
const path = require("path")

const IS_PROD = process.env.NODE_ENV !== "development"

let mainWindow, commonWindow
const { app, ipcMain, Menu, BrowserWindow } = require("electron")

function createWindow() {

  mainWindow = new BrowserWindow({
    width: IS_PROD ? 960 : 1200,
    height: 480,
  })

  if (IS_PROD) {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`)
  } else {
    mainWindow.loadURL(`http://localhost:9966`)
  }

  if (!IS_PROD) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on("closed", function() {
    mainWindow = null
  })

  var template = [
    {
      label: "Application",
      submenu: [
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: function() {
            app.quit()
          },
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        {
          label: "Undo",
          accelerator: "CmdOrCtrl+Z",
          selector: "undo:",
        },
        {
          label: "Redo",
          accelerator: "Shift+CmdOrCtrl+Z",
          selector: "redo:",
        },
        { type: "separator" },
        {
          label: "Cut",
          accelerator: "CmdOrCtrl+X",
          selector: "cut:",
        },
        {
          label: "Copy",
          accelerator: "CmdOrCtrl+C",
          selector: "copy:",
        },
        {
          label: "Paste",
          accelerator: "CmdOrCtrl+V",
          selector: "paste:",
        },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:",
        },
      ],
    },
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

app.on("ready", createWindow)
app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow()
  }
})

