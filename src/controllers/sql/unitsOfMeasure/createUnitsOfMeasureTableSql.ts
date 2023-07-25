const createUnitsOfMeasureTableSql = `
  CREATE TABLE IF NOT EXISTS units_of_measure (
    id INTEGER PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,
    abbreviation CHAR(8) NOT NULL UNIQUE,
    uomt_id INTEGER NOT NULL,
    FOREIGN KEY (uomt_id) REFERENCES units_of_measure_types (id)
  );
`

export default createUnitsOfMeasureTableSql
