import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import PropTypes from "prop-types"
import { autobind } from "core-decorators"
import { connect } from "react-redux"
import {
  compose,
  setDisplayName,
  onlyUpdateForPropTypes,
  withHandlers,
} from "recompose"
import { ROUTES } from "routes"
import {
  composeElement,
  Container,
  Section,
  Div,
  Bb,
  extend,
} from "UI/UIComponents"
import { InputForm } from "UI/inputs"
import { setInstructions } from "actions/app"
import { getRoomSlug } from "selectors/webrtc"

const Button = composeElement(["flex"], "button")
const Input = composeElement(["flex"], "input")
const ContainerEl = extend(Container, ["wrap"])
export const VideoEl = composeElement(["abs", "abs--tl"], "video")

class VideoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [{}, {}, {}],
    }
  }
  componentDidMount() {}

  componentDidUpdate() {}

  @autobind
  onAddVideo(data) {
    const videos = this.state.videos
    videos[data.index] = data.value
    this.setState({ videos: [...video] })
  }

  render() {
    if (this.props.isStarted) return null
    return (
      <Section centerBoth="true">
        {this.state.videos.map((v, i) => {
          return (
            <Div>
              {v.src && <VideoEl src={v.src} />}
              <InputForm index={i} onChange={this.onAddVideo} />
            </Div>
          )
        })}
      </Section>
    )
  }
}

const mapStateToProps = () => (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, props) => ({})

export default withRouter(
  compose(
    setDisplayName("VideoComponent"),
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    onlyUpdateForPropTypes
  )(VideoComponent)
)
