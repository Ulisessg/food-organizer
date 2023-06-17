const getPurchasePlacesSql = `SELECT 
purchase_places.id, purchase_places.name, purchase_places.address

FROM purchase_places
ORDER BY purchase_places.name
`

module.exports = getPurchasePlacesSql
