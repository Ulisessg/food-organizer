export const onlyLetters = /[a-zA-Z]/u
export const lettersAndUnderscore = /^[\p{L}_]+$/u
export const lettersWithSpaces = /^[\p{L}\s]+$/u
export const lettersAndDegrees = /^[\p{L}\\°]+$/u
export const addressRegexp = /^[\p{L}0-9\s.°]+$/u
// ISO8601Date regexp use dayjs.toISOString() format
export const ISO8601Date = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/u

export const inputNumberPattern = /^[1-9]\d*$/ugs
