import * as ACTIONS from 'actions/actionTypes'
import CONFIG from 'common/config'
import {
  SERVER_URL,
  CANVAS_OUTPUT_ID,
  LOCAL_VIDEO_ID,
  REMOTE_VIDEOS_EL_ID,
} from 'common/constants'
import { Map } from 'immutable'

const initialState = new Map()
  .set('settings', {
    url: SERVER_URL,
    outputCanvas: CANVAS_OUTPUT_ID,
    localVideoEl: LOCAL_VIDEO_ID,
    remoteVideosEl: REMOTE_VIDEOS_EL_ID,
    width: CONFIG.width,
    height: CONFIG.height,
    frameRate: CONFIG.fps,
    noVideo: false,
    noAudio: true,
    autoRemoveVideos: true,
    autoRequestMedia: true,
    receiveMedia: {
      offerToReceiveAudio: false,
      offerToReceiveVideo: true,
    },
    peerConnectionConfig: {
      iceServers: [
        {
          url: 'stun3.l.google.com:19302',
        },
        {
          url: 'stun.stunprotocol.org',
        },
      ],
      iceTransports: 'relay',
    },
  })
  .set('room', {
    id: 'sam',
  })

export default function webrtc(state = initialState, action) {
  switch (action.type) {
    default: {
      return state
    }
  }
}
