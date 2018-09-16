import React from "react"
import {
  composeElement,
  Container,
  Section,
  Div,
  Bb,
  extend,
} from "UI/UIComponents"
const Input = composeElement(["flex"], "input")
const Button = composeElement(["flex"], "button")

export const InputForm = props => (
  <Div>
    <Input onChange={props.onChange} />
    <Button>submit</Button>
  </Div>
)
