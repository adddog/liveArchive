import { values, isObject, isArray, isString } from 'lodash'

export const forceArray = val =>
  isObject(val) ? values(val) : isArray(val) ? val : isString(val) ? [val] : val
