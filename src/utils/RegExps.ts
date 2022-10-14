export const onlyLetters = /[a-zA-Z]/u
export const lettersAndUnderscore = /^[\p{L}_]+$/u
export const lettersWithSpaces = /^[\p{L}\s]+$/u
export const lettersAndDegrees = /^[\p{L}\\°]+$/u
export const addressRegexp = /^[\p{L}0-9\s.°]+$/u
// eslint-disable-next-line max-len, no-useless-escape
export const urlRegExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)+$/u
