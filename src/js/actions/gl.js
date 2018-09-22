import * as ACTIONS from 'actions/actionTypes'

export function setVideoInputs(payload) {
  return {
    type: ACTIONS.SET_VIDEO_INPUTS,
    payload,
  }
}
