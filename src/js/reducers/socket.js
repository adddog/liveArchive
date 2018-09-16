import * as ACTIONS from 'actions/actionTypes'
import { Map, List, fromJS, setIn } from 'immutable'

const initialState = fromJS({
  user: {
    id: null,
    partner: {
      id: null,
      status: null,
    },
  },
  messages: new List(),
  userIds: [],
})

export default function socket(state = initialState, action) {
  switch (action.type) {
    /*************
     *  set you
     ************ */
    case ACTIONS.SOCKET_SET_USER: {
      return setIn(state, ['user', 'id'], action.payload.id)
    }

    /*************
     *  only allow new ids and not you
     ************ */
    case ACTIONS.SOCKET_SET_USERS_IDS: {
      return state.set(
        'userIds',
        state
          .get('userIds')
          .concat(
            new List(action.payload).filter(
              id =>
                state.get('userIds').indexOf(id) < 0 &&
                id !== state.getIn(['user', 'id']),
            ),
          ),
      )
    }

    case ACTIONS.SOCKET_REMOVE_USERS_IDS: {
      return state.set(
        'userIds',
        state.get('userIds').filter(id => action.payload.indexOf(id) < 0),
      )
    }

    case ACTIONS.SOCKET_REQ_PARTNER_CONFIRM:
    case ACTIONS.SOCKET_REQ_PARTNER: {
      return setIn(
        state,
        ['user', 'partner'],
        state.getIn(['user', 'partner']).merge(new Map(action.payload)),
      )
    }
    case ACTIONS.SOCKET_MSG_RECEIVE: {
      return state.set('messages', state.get('messages').push(action.payload))
    }
    case ACTIONS.SOCKET_MSG_SEND_NO_REPLY: {
      return state.set(
        'messages',
        state.get('messages').set(
          state.get('messages').findIndex(item => {
            return item.fromId === action.payload.id
          }),
          action.payload,
        ),
      )
    }
    default: {
      return state
    }
  }
}
