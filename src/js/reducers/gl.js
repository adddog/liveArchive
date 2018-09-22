import * as ACTIONS from 'actions/actionTypes'
import { MEDIA_TYPES, MAX_MEDIA_INPUTS } from 'common/constants'
import CONFIG from 'common/config'
import { Map, List, fromJS } from 'immutable'

const initialState = new Map()
  /*************
   *  config
   ************ */
  .set('videoInputs', new List())

export default function gl(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_VIDEO_INPUTS: {
      return state.set('videoInputs', fromJS(action.payload))
    }
    default: {
      return state
    }
  }
}
