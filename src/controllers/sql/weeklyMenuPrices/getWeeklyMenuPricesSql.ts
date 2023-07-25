
const getWeeklyMenuPricesSql = `SELECT
weekly_menu_prices.id, weekly_menu_prices.weekly_menu_id,
weekly_menu_prices.price_date AS price_date,
weekly_menu_prices.value

FROM weekly_menu_prices
ORDER BY price_date DESC
`

export default getWeeklyMenuPricesSql
