import QS from 'query-string'

export const getRoomId = (state, props) => props.match.params
export const getRoomIdFromMatchParams = (state, props) =>
  props.match.params.roomId
