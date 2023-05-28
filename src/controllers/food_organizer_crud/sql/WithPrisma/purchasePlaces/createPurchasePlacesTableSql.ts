const createPurchasePlacesTableSql = `
  CREATE TABLE IF NOT EXISTS purchase_places (
    id INTEGER PRIMARY KEY,
    name CHAR(50) NOT NULL UNIQUE,
    address VARCHAR(50),
    creation_date DATETIME NOT NULL
  )
`

export default createPurchasePlacesTableSql
