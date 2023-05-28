const createIngredientPricesTableSql = `
  CREATE TABLE IF NOT EXISTS ingredient_prices (
    id INTEGER PRIMARY KEY,
    value DECIMAL(10,2) NOT NULL,
    price_date TEXT NOT NULL,
    creation_date TEXT NOT NULL,

    ingredient_id INT NOT NULL,
    purchase_place_id INT NOT NULL,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
    FOREIGN KEY (purchase_place_id) REFERENCES purchase_places(id)
  )
`

export default createIngredientPricesTableSql
