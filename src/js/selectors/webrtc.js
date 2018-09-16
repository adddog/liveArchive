export const getRoomSlug = state => state.webrtc.get('room').id
export const getRoomId = state => state.webrtc.get('room').id

export const getWebRTCProps = (state, ownProps = {}) => ({
  /**~~~~**
      to select
  **~~~~**/
  elementIds: {
    outputCanvas: state.webrtc.get('settings').outputCanvas,
    localVideo: state.webrtc.get('settings').localVideoEl,
    remoteVideo: state.webrtc.get('settings').remoteVideosEl,
  },
  settings: state.webrtc.get('settings'),
  useWebcam: !state.webrtc.get('settings').noVideo,
  socketId: state.socket.getIn(['user', 'id']),
  room: {
    id: ownProps.roomId || getRoomId(state),
  },
  roomId: ownProps.roomId || getRoomId(state),
})

export const getDimentions = (state, ownProps = {}) => ({
  width: state.webrtc.get('settings').width,
  height: state.webrtc.get('settings').height,
})
