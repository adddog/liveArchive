import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { isEnvTrue } from 'utils'
import { connect } from 'react-redux'
import {
    compose,
    setDisplayName,
    onlyUpdateForPropTypes,
    withHandlers,
} from 'recompose'
import { videoSettings } from 'common/constants'
import { ROUTES } from 'routes'
import {
    composeElement,
    Container,
    Section,
    Div,
    Bb,
    extend,
} from 'UI/UIComponents'
import GL from 'gl'
import { InputForm } from 'UI/inputs'
import { setInstructions } from 'actions/app'
import { getRoomSlug } from 'selectors/webrtc'

const MAIN = composeElement(['abs', 'full', 'tl'], 'div')
const CanvasEl = composeElement(
    ['abs'],
    'canvas',
    `backface-visibility: hidden
    perspective: 1
    transform-origin: 0% 0%
    transform: scale3d(1,1,1)`,
)

class RenderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videos: [{}, {}, {}],
        }
        this.canvasEl = React.createRef()
    }
    componentDidMount() {
        this.gl = new GL(this.canvasEl.current, videoSettings)
    }

    componentWillReceiveProps(np) {
        if(np.videoInputs.size){
            this.gl.start()
        }
    }

    componentDidUpdate() {}

    shouldComponentUpdate() {
        return false
    }

    render() {
        if (this.props.isStarted) return null
        return (
            <MAIN centerBoth="true">
                <CanvasEl
                    width={videoSettings.width}
                    height={videoSettings.height}
                    innerRef={this.canvasEl}
                />
            </MAIN>
        )
    }
}

const mapStateToProps = () => (state, ownProps) => ({
    videoInputs: state.gl.get('videoInputs'),
})

const mapDispatchToProps = (dispatch, props) => ({})

export default withRouter(
    compose(
        setDisplayName('RenderComponent'),
        connect(mapStateToProps, mapDispatchToProps),
    )(RenderComponent),
)
