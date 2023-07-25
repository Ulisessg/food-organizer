const getDaysSql = `
  SELECT * FROM days ORDER BY days.id ASC
`

module.exports = getDaysSql
