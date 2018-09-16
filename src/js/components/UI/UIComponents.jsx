import { isArray } from 'lodash'
import styled from 'styled-components'

const MODS = {
  flex: `
    display: flex;
  `,

  fixed: `
    position: fixed;
  `,

  abs: `
    position: absolute;
  `,

  tl: `
   top:0;
    left:0;
  `,

  'abs--tl': `
  position: absolute;
  top:0;
  left:0;
  `,

  full: `
  width: 100%;
  height: 100%;
  `,

  centerBoth: `
    justify-content:center;
    align-items:center;
  `,

  wrap: `
    flex-wrap: wrap;
  `,
}

export const composeElement = (mods, tagName = 'div', props = ``) => {
  const content = `
    ${(isArray(mods) ? mods : [mods]).map(str => MODS[str] || '').join('')};
      ${props}
  `
  switch (tagName) {
    case 'div':
      return styled.div`
        ${content};
      `
      break
    case 'canvas':
      return styled.canvas`
        ${content};
      `
      break
    case 'button':
      return styled.button`
        ${content};
      `
      break
    case 'video':
      return styled.video`
        ${content};
      `
      break
    case 'input':
      return styled.input`
        ${content};
      `
      break
  }
}

export const extend = (el, mods = [], props = ``) => {
  return styled(el)`
    ${(isArray(mods) ? mods : [mods]).map(str => MODS[str] || '').join('')};
    ${props};
  `
}

export const Span = styled.span`
  position: relative;
`

export const Text = styled.p`
  position: relative;
`

export const Div = styled.div`
  position: relative;
`

export const Input = styled.input``

export const Button = styled.button``

export const Main = styled.section`
  position: relative;
  display: flex;
  min-width: 100%;
  ${MODS.full};
`

export const Container = styled.section`
  position: relative;
  display: flex;
`
export const ContainerStack = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
`

export const Section = styled.section`
  position: relative;
  display: flex;
  ${props => (props.centerBoth ? MODS.centerBoth : '')};
  ${MODS.full};
`
