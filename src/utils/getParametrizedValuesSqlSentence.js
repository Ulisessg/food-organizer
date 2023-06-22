/**
 *
 * @param {number} fieldsAmount - number Includes 'id' filed
 * @param {number} recordsAmount - number
 *  @returns {string}
 * @example
 * const sqlSentence = `
 *  INSERT INTO x (id, name, age) ${getParametrizedValuesSqlSentence(3, 4)}
 * `
 * console.log(sqlSentence)
 * // INSERT INTO x (id, name, age) VALUES (?,?,?), (?,?,?), (?,?,?), (?,?,?)
 */
const getParametrizedValuesSqlSentence = (fieldsAmount, recordsAmount) => {
  if (!Number.isInteger(fieldsAmount)) throw new Error('fieldsAmount must be integer number type')
  if (!Number.isInteger(recordsAmount)) throw new Error('recordsAmount must be integer number type')

  const parameter = '?,'

  // Last parameter must not end with comma
  const parametrizedRecords =
    `(${parameter.repeat(fieldsAmount - 1)}?)`.repeat(recordsAmount)

  const valuesSentence = `VALUES ${parametrizedRecords}`

  return valuesSentence
}

module.exports = getParametrizedValuesSqlSentence
