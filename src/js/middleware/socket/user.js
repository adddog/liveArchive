import * as ACTIONS from 'actions/actionTypes'
import * as EVENTS from 'server/events'

export default function userHandler(server) {

  function onAction(action) {
    switch (action.type) {
      case ACTIONS.SOCKET_MSG_SEND_NO_REPLY: {
        return server.socket.user.sendMessageNoReply(EVENTS.USER_MESSAGE, action)
      }
      case ACTIONS.SOCKET_MSG_SEND:
      case ACTIONS.SOCKET_REQ_PARTNER_CONFIRM: {
        return server.socket.user.sendMessage(EVENTS.USER_MESSAGE, action)
      }
    }
  }

  return {
    onAction,
  }
}
