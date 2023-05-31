const createMenuPricesTableSql = `
  CREATE TABLE IF NOT EXISTS menu_prices (
    id INT PRIMARY KEY,
    value DECIMAL(10,2) NOT NULL,
    price_date DATETIME NOT NULL,
    

    menu_id INT NOT NULL,
    FOREIGN KEY (menu_id) REFERENCES menus(id)
  )
`

export default createMenuPricesTableSql
