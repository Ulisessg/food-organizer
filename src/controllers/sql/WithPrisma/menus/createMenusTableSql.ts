const createMenusTableSql = `
  CREATE TABLE IF NOT EXISTS menus (
    id INTEGER PRIMARY KEY,
    
    comment VARCHAR(100)
  )
`
export default createMenusTableSql
