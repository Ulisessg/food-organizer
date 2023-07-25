const createMenuFoodsTableSql = `
  CREATE TABLE IF NOT EXISTS menu_foods (
    id INTEGER PRIMARY KEY,
    

    food_id INT NOT NULL,
    menu_id INT NOT NULL,

    FOREIGN KEY (food_id) REFERENCES foods(id),
    FOREIGN KEY (menu_id) REFERENCES menus(id)
  )
`

export default createMenuFoodsTableSql
