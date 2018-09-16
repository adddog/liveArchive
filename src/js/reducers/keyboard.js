import * as ACTIONS from 'actions/actionTypes'
import { MEDIA_TYPES, MAX_MEDIA_INPUTS } from 'common/constants'
import { INIT_TEXTURE_INDEXS } from 'gl/models/keyboard'
import { Map } from 'immutable'

const initialState = new Map().set('textureIndexs', [...INIT_TEXTURE_INDEXS])

export default function keyboard(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.KEY_UPDATE: {
      console.log(action)
      return state
    }
    default: {
      return state
    }
  }
}
