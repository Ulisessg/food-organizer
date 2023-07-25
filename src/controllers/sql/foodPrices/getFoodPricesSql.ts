const getFoodPricesSql = `SELECT
food_prices.id, food_prices.food_id, food_prices.price_date AS price_date,
food_prices.value

FROM food_prices
ORDER BY price_date DESC
`

export default getFoodPricesSql
