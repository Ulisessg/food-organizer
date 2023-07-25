import { DbTablesNames } from 'utils/constants'

/**
 * Sqlite
 */
const createUnitsOfMeasureTypeTableSql = `
  CREATE TABLE IF NOT EXISTS ${DbTablesNames.unitsOfMeasureTypes} (
    id INTEGER PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE
  );
`

export default createUnitsOfMeasureTypeTableSql
