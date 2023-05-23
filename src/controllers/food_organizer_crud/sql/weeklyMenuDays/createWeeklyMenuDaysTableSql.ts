const createWeeklyMenuDaysTableSql = `
  CREATE TABLE IF NOT EXISTS weekly_menu_days(
    id INT PRIMARY KEY,
    weekly_menu_id INT NOT NULL,
    menu_id INT NOT NULL,
    day_id INT NOT NULL,

    FOREIGN KEY (weekly_menu_id) REFERENCES weekly_menus(id),
    FOREIGN KEY (menu_id) REFERENCES menus(id),
    FOREIGN KEY (day_id) REFERENCES days(id)
  )
`

export default createWeeklyMenuDaysTableSql
