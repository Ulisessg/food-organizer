/**
 * Sqlite
 */
const createIngredientsTableSql = `
  CREATE TABLE IF NOT EXISTS ingredients (
    id INTEGER PRIMARY KEY,
    name VARCHAR (20) NOT NULL UNIQUE,
    uom_id INTEGER NOT NULL,
    image VARCHAR(50),
    comment varchar(100),
    FOREIGN KEY (uom_id) REFERENCES units_of_measure(id)
  )
`
export default createIngredientsTableSql
