const createFoodPricesTableSql = `
  CREATE TABLE IF NOT EXISTS food_prices (
    id INTEGER PRIMARY KEY,
    value DECIMAL(10,2) NOT NULL,
    price_date DATETIME NOT NULL,
    creation_date DATETIME NOT NULL,

    food_id INT NOT NULL,

    FOREIGN KEY (food_id) REFERENCES foods(id)
  )
`
export default createFoodPricesTableSql
