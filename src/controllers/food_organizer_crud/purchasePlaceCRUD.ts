/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import purchasePlaceValidations, { validations } from 'models/purchasePlaceValidations'
import capitalize from 'utils/capitalize'
import prisma from 'lib/prisma'
import type { purchase_places } from '@prisma/client'
import { type response } from 'controllers/response'

// eslint-disable-next-line max-statements
export const createPurchasePlace = async (
  req: CreatePurchasePlace,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { address, creation_date, name } = req.body
    purchasePlaceValidations({
      address,
      creationDate: creation_date as unknown as string,
      name
    })
    let modifiedAddress: string | null = null
    if (typeof address === 'string') {
      modifiedAddress = capitalize(address)
    }
    await prisma.purchase_places.create({
      data: {
        address: modifiedAddress,
        creation_date,
        name: capitalize(name)
      }
    })
    res.status(201).send({
      data: 'purchase place successful created',
      error: false
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      data: null,
      error: true
    })
  }
}

export const getPurchasePlaces = async (
  req: NextApiRequest,
  res: NextApiResponse<response<GetPurchasePlaces>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<GetPurchasePlaces>`SELECT 
purchase_places.id, purchase_places.name, purchase_places.address
FROM purchase_places
ORDER BY purchase_places.name
`
    res.status(200).send({
      data: result,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: null,
      error: true
    })
  }
}

// eslint-disable-next-line max-statements
export const updatePurchasePlace = async (
  req: CreatePurchasePlace,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { address, name, id } = req.body
    validations.address(address)
    validations.name(name)
    let modifiedAddress: string | null = null
    if (typeof address === 'string') {
      modifiedAddress = capitalize(address)
    }
    await prisma.$executeRaw`UPDATE IGNORE purchase_places SET
address = ${modifiedAddress},
name = ${capitalize(name)}
WHERE purchase_places.id = ${id}
`
    res.status(200).send({
      data: 'successful update',
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({ data: 'error updating purchase place', error: true })
  }
}

export type GetPurchasePlaces = Array<{
  id: number
  name: string
  address: string | null
}>

interface CreatePurchasePlace extends NextApiRequest {
  body: purchase_places
}
