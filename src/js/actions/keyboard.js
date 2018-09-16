import {
  KEY_UPDATE,
} from 'actions/actionTypes';

export function keyboardUpdate(payload = {}) {
  return {
    type: KEY_UPDATE,
    payload
  };
}
