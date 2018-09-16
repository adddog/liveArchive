import * as ACTIONS from 'actions/actionTypes'

export function setInstructions(payload = {}) {
  return {
    type: ACTIONS.APP_INSTRUCTIONS_SET,
    payload
  };
}
