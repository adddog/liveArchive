import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { composeElement, Div, extend } from 'UI/UIComponents'
import { MARGINS, COLORS } from 'styles/variables'
const ContainerEl = extend(Div, ['fixed', 'full', 'tl', 'flex', 'centerBoth'])

const ContentEl = extend(
  Div,
  ['flex', 'centerBoth'],
  `
  padding: ${MARGINS.large}
  background-color: ${COLORS['gray-lightest']}
  `,
)
const PeerDialogComponent = props => (
  <ContainerEl>
    <ContentEl>{props.children}</ContentEl>
  </ContainerEl>
)

export default PeerDialogComponent
