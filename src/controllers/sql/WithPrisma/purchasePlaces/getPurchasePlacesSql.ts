import prisma from 'lib/prisma'

const getPurchasePlacesSql = async (): Promise<GetPurchasePlaces> => {
  const purchasePlaces = await prisma.$queryRaw<GetPurchasePlaces>`SELECT 
  purchase_places.id, purchase_places.name, purchase_places.address
  FROM purchase_places
  ORDER BY purchase_places.name
  `
  return purchasePlaces
}

export type GetPurchasePlaces = Array<{
  id: number
  name: string
  address: string | null
}>

export default getPurchasePlacesSql
