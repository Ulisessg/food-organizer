const createWeeklyMenuPricesTableSql = `
  CREATE TABLE IF NOT EXISTS weekly_menu_prices (
    id INT PRIMARY KEY,
    value DECIMAL(10,2) NOT NULL,
    price_date DATETIME NOT NULL,
    
    
    weekly_menu_id INT NOT NULL,
    FOREIGN KEY (weekly_menu_id) REFERENCES weekly_menus(id)
  )
`
export default createWeeklyMenuPricesTableSql
