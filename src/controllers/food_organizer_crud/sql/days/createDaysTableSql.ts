/**
 * SQLite
 */
const createDaysTableSql = `
  CREATE TABLE IF NOT EXISTS days (
    id INTEGER PRIMARY KEY,
    name CHAR(9) NOT NULL UNIQUE
  );
  INSERT OR IGNORE INTO days (id,name) VALUES
  (NULL,"Lunes"),
  (NULL,"Martes"),
  (NULL,"Miercoles"),
  (NULL,"Jueves"),
  (NULL,"Viernes"),
  (NULL,"Sábado"),
  (NULL,"Domingo");
`

export default createDaysTableSql
