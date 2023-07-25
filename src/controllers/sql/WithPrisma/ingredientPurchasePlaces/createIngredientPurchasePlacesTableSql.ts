const createIngredientPurchasePlaceTableSql = `
  CREATE TABLE IF NOT EXISTS ingredient_purchase_places (
    id INTEGER PRIMARY KEY,
    
    
    ingredient_id INTEGER NOT NULL,
    purchase_place_id INT NOT NULL,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
    FOREIGN KEY (purchase_place_id) REFERENCES purchase_places(id)
  )
`

export default createIngredientPurchasePlaceTableSql
