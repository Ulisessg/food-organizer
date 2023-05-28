const createFoodsTableSql = `
  CREATE TABLE IF NOT EXISTS foods (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    preparation_time SMALLINT DEFAULT 0,
    image VARCHAR(50),
    creation_date DATETIME NOT NULL,
    used_counter INT DEFAULT 0,

    food_type_id INT NOT NULL,
    FOREIGN KEY (food_type_id) REFERENCES food_types(id)
  )
`

export default createFoodsTableSql
