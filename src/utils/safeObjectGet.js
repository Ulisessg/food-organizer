/* eslint-disable security/detect-object-injection */
/* eslint-disable max-len */
/**
 * Access object properties
 * voiding risks,
 * more info:
 * https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/the-dangers-of-square-bracket-notation.md
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const safeObjectGet = (object, key) => {
  if (key === 'constructor' && typeof object[key] === 'function') {
    throw new Error('')
  }

  if (key === '__proto__') {
    throw new Error('')
  }

  return object[key]
}

module.exports = safeObjectGet
