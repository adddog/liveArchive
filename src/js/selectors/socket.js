import { REQUESTING, CONFIRMED, INACTIVE } from 'common/states'

export const getUserIds = (state, exlcudeYou = true) => {
  const id = state.socket.getIn(['user', 'id'])
  return state.socket
    .get('userIds')
    .filter(i => i !== id)
    .toArray()
}

export const requestingPartnerStatusOf = state => {
  return state.socket.getIn(['user', 'partner', 'status']) === REQUESTING
    ? state.socket.getIn(['user', 'partner'])
    : null
}

export const getIncomingMessages = state => {
  return state.socket
    .get('messages')
    .toArray()
    .filter(data => data.status !== INACTIVE)
    .map(data => {
      const cleaned = {
        ...data,
      }
      return cleaned
    })
}
