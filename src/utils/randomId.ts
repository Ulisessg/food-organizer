/**
 *
 * @param {string} prefix - Value used before random numbers
 * @returns
 */
const randomId = (prefix?: string):
string => `${prefix ?? ''}${Math.floor((
  Math.random() * 343534453) *
  (Math.random() * 12242435353) *
   (Math.random() * 343237453423) *
   (Math.random() * 343237327) *
   (Math.random() * 344323212346))}`

export default randomId
