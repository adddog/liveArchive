import { combineReducers } from "redux"
import { createResponsiveStateReducer } from 'redux-responsive';
import app from "./app"
import routes from "./routes"
import keyboard from "./keyboard"
import settings from "./settings"
import socket from "./socket"
import webrtc from "./webrtc"
import gl from "./gl"

export default combineReducers({
  browser: createResponsiveStateReducer(
    {
      mobile: 360,
      phablet: 540,
      tablet: 768,
      tabletH: 1024,
      desktop: 1280,
      desktopM: 1440,
      desktopL: 1680,
      desktopXL: 1920
    },
    {
      extraFields: () => ({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  ),
  routes,
  app,
  keyboard,
  settings,
  socket,
  webrtc,
  gl,
})
