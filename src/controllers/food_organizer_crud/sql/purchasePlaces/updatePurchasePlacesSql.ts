import capitalize from 'utils/capitalize'
import prisma from 'lib/prisma'
import { type purchase_places } from '@prisma/client'
import { validations } from 'models/purchasePlaceValidations'

const updatePurchasePlaceSql = async (purchasePlace: purchase_places): Promise<purchase_places> => {
  const { address, name, id } = purchasePlace
  validations.address(address)
  validations.name(name)
  let capitalizedAddress: string | null = null
  if (typeof address === 'string') {
    capitalizedAddress = capitalize(address)
  }
  const purchasePlaceUpdate = await prisma.purchase_places.update({
    data: {
      address: capitalizedAddress,
      name
    },
    where: {
      id
    }
  })

  return purchasePlaceUpdate
}

export default updatePurchasePlaceSql
