export type GetPurchasePlaces = Array<{
  id: number
  name: string
  address: string | null
}>

export interface CreatePurchasePlace {
  address: string | null
  name: string
}
