const createMenusTableSql = `
  CREATE TABLE IF NOT EXISTS menus (
    id INTEGER PRIMARY KEY,
    creation_date DATETIME NOT NULL,
    comment VARCHAR(100)
  )
`
export default createMenusTableSql
