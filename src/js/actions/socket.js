import * as ACTIONS from 'actions/actionTypes'
import { forceArray } from 'utils/functions'

export function setUser(payload) {
  return {
    type: ACTIONS.SOCKET_SET_USER,
    payload,
  }
}

/*************
 *  force to array
 ************ */
export function setUsersIds(userIds) {
  return {
    type: ACTIONS.SOCKET_SET_USERS_IDS,
    payload: forceArray(userIds),
  }
}

export function removeUsersIds(userIds) {
  return {
    type: ACTIONS.SOCKET_REMOVE_USERS_IDS,
    payload: forceArray(userIds),
  }
}

export function requestPartner(payload) {
  return {
    type: ACTIONS.SOCKET_REQ_PARTNER,
    payload,
  }
}

export function requestPartnerConfirm(text) {
  return {
    type: ACTIONS.SOCKET_REQ_PARTNER_CONFIRM,
    payload: text,
  }
}

/*************
 *  messages
 ************ */

export function messageReceived(payload) {
  return {
    type: ACTIONS.SOCKET_MSG_RECEIVE,
    payload,
  }
}

export function messageDelete(payload) {
  return {
    type: ACTIONS.SOCKET_MSG_DELETE,
    payload,
  }
}

export function messageSend(payload) {
  return {
    type: ACTIONS.SOCKET_MSG_SEND,
    payload,
  }
}

export function messageSendNoReply(payload) {
  return {
    type: ACTIONS.SOCKET_MSG_SEND_NO_REPLY,
    payload,
  }
}
