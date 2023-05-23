const createFoodTypesTableSql = `
  CREATE TABLE IF NOT EXISTS food_types (
    id INTEGER PRIMARY KEY,
    name CHAR(50) NOT NULL UNIQUE,
    creation_date DATETIME NOT NULL
  )
`

export default createFoodTypesTableSql
