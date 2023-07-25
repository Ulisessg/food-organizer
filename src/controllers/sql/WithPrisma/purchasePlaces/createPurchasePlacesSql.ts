/* eslint-disable @typescript-eslint/naming-convention */
import PurchasePlaceValidations from 'models/purchasePlaceValidations'
import capitalize from 'utils/capitalize'
import prisma from 'lib/prisma'
import { type purchase_places } from '@prisma/client'

const createPurchasePlaceSql = async (purchasePlace: CreatePurchasePlace):
Promise<purchase_places> => {
  const { address, creation_date, name } = purchasePlace
  PurchasePlaceValidations({
    address,
    creationDate: creation_date,
    name
  })
  let capitalizedAddress: string | null = null
  if (typeof address === 'string') {
    capitalizedAddress = capitalize(address)
  }
  const result = await prisma.purchase_places.create({
    data: {
      address: capitalizedAddress,
      creation_date,
      name: capitalize(name)
    }
  })
  return result
}

export default createPurchasePlaceSql

export interface CreatePurchasePlace {
  address: string | null
  creation_date: string
  name: string
}
