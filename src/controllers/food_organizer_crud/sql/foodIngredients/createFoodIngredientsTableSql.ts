import { DbTablesNames } from 'utils/constants'

const createFoodIngredientsTableSql = `
  CREATE TABLE IF NOT EXISTS ${DbTablesNames.foodIngredients} (
    id INTEGER PRIMARY KEY,
    creation_date DATETIME NOT NULL,
    ingredient_qty DECIMAL(10,2) NOT NULL,

    food_id INT NOT NULL,
    ingredient_id NOT NULL,
    
    FOREIGN KEY (food_id) REFERENCES foods(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
  )
`

export default createFoodIngredientsTableSql
