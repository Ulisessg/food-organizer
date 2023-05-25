const getPurchasePlacesSql = `SELECT 
purchase_places.id, purchase_places.name, purchase_places.address

FROM purchase_places
ORDER BY purchase_places.name
`

export type GetPurchasePlaces = Array<{
  id: number
  name: string
  address: string | null
}>

export default getPurchasePlacesSql
