/**
 * SQLite
 */
const createDaysTableSql = `
  CREATE TABLE IF NOT EXISTS days (
    id INTEGER PRIMARY KEY,
    name CHAR(9) NOT NULL UNIQUE
  );
`

export default createDaysTableSql
