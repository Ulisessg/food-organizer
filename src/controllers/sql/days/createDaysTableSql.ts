import { DbTablesNames } from 'utils/constants'

const createDaysTableSql = `
  CREATE TABLE IF NOT EXISTS ${DbTablesNames.days} (
    id INTEGER PRIMARY KEY,
    name CHAR(9) NOT NULL UNIQUE
  );
`

export default createDaysTableSql
