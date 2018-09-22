import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { MEDIA_TYPES, ALLOWED_TYPES, LOCAL_VIDEO_ID } from 'common/constants'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { isEmpty, sample } from 'lodash'
import { isEnvTrue } from 'utils'
import { AppEmitter as Emitter } from 'common/emitters'
import { M_INPUT_NEW } from 'common/events'
import { connect } from 'react-redux'
import {
  compose,
  setDisplayName,
  onlyUpdateForPropTypes,
  withHandlers,
} from 'recompose'
import { ROUTES } from 'routes'
import {
  composeElement,
  Container,
  Section,
  Div,
  Bb,
  extend,
} from 'UI/UIComponents'
import { InputForm } from 'UI/inputs'
import { setInstructions } from 'actions/app'
import { setVideoInputs } from 'actions/gl'
import { getRoomSlug } from 'selectors/webrtc'

const Button = composeElement(['flex'], 'button')
const Input = composeElement(['flex'], 'input')
const ContainerEl = extend(Container, ['wrap'])
const VideoEl = composeElement(
  [],
  'video',
  `width: 340px;
  visibility: hidden;
  opacity: 0;
  `,
)

const DEVS = ['media/fb.mp4', 'media/fb1.mp4']
class VideoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [{}, {}, {}],
    }
  }
  componentDidMount() {}

  componentDidUpdate() {
    this.state.videos.forEach((obj, i) => {
      if (!isEmpty(obj)) {
        Emitter.emit(M_INPUT_NEW, {
          type: MEDIA_TYPES.VIDEO_EL,
          index: i,
        })
      }
    })
  }

  @autobind
  onAddVideo(data) {
    const videos = this.state.videos
    videos[Number(data.target.dataset.index)] = {
      src: isEnvTrue(process.env.FAKE) ? sample(DEVS) : data.value,
    }
    this.props.setVideoInputs(videos)
    this.setState({ videos: [...videos] })
  }

  render() {
    return (
      <Section centerBoth="true">
        {this.state.videos.map((v, i) => {
          return (
            <Div>
              {v.src && (
                <VideoEl
                  id={`${LOCAL_VIDEO_ID}${i}`}
                  autoPlay
                  loop
                  muted
                  src={v.src}
                />
              )}
              <InputForm index={i} onSubmit={this.onAddVideo} />
            </Div>
          )
        })}
        <Button
          onClick={() => {
            console.log(window.EAPI);
            window.EAPI.startRender()
            //global.EAPI.sendEvent('render:start', {})
          }}
        >
          record
        </Button>
      </Section>
    )
  }
}

const mapStateToProps = () => (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, props) => ({
  setVideoInputs: videos => dispatch(setVideoInputs(videos)),
})

export default withRouter(
  compose(
    setDisplayName('VideoComponent'),
    connect(mapStateToProps, mapDispatchToProps),
    onlyUpdateForPropTypes,
  )(VideoComponent),
)
