/* eslint-disable max-len */
/* eslint-disable security/detect-object-injection */

/**
 * Access array elements
 * voiding risks,
 * more info:
 * https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/the-dangers-of-square-bracket-notation.md
 */
const safeArrayGet = <T>(arr: T[], index: number): typeof arr[0] => {
  if ((index as unknown as string) === 'constructor' && typeof arr[index] === 'function') {
    throw new Error('')
  }

  if ((index as unknown as string) === '__proto__') {
    throw new Error('')
  }
  return arr[index]
}

export default safeArrayGet
