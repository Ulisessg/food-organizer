/**
 * Sqlite
 */
const createUnitsOfMeasureTypeTableSql = `
  CREATE TABLE IF NOT EXISTS units_of_measure_type (
    id INTEGER PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,
    creation_date DATETIME NOT NULL
  );
`

export default createUnitsOfMeasureTypeTableSql
