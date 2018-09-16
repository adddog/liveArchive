import * as ACTIONS from "actions/actionTypes";
import {MEDIA_TYPES,MAX_MEDIA_INPUTS} from "common/constants"
import CONFIG from "common/config"
import { Map } from "immutable";

const initialState = new Map()
/* ************
*  config
************ */
  .set("settings", {
    maxInputs: MAX_MEDIA_INPUTS,
    numChannels: 3,
    width: CONFIG.width,
    height: CONFIG.height
  })
  .set("videoInputs", {
    [MEDIA_TYPES.webcam]: {},
    [MEDIA_TYPES.canvas]: {},
    [MEDIA_TYPES.instagram]: {},
    [MEDIA_TYPES.media]: {},
    [MEDIA_TYPES.file]: {},
    [MEDIA_TYPES.remove]: {},
  })

export default function webrtc(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
