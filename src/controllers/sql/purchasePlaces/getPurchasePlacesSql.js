const getPurchasePlacesSql = (filter = '') => `SELECT 
purchase_places.id, purchase_places.name, purchase_places.address

FROM purchase_places
${filter}
ORDER BY purchase_places.name
`

module.exports = getPurchasePlacesSql
