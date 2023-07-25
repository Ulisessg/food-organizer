const createIngredientStockTableSql = `
  CREATE TABLE IF NOT EXISTS ingredient_stock (
    id INTEGER PRIMARY KEY,
    ingredient_qty DECIMAL (10, 2) NOT NULL,
    comment VARCHAR(100),
    ingredient_id INTEGER,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
  )
`

export default createIngredientStockTableSql
