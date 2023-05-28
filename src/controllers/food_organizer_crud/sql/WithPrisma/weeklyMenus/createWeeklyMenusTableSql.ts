const createWeeklyMenuTableSql = `
  CREATE TABLE IF NOT EXISTS weekly_menus (
    id INTEGER PRIMARY KEY,
    creation_date DATETIME NOT NULL UNIQUE
  )
`

export default createWeeklyMenuTableSql
