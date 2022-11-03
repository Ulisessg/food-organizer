/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import purchasePlaceValidations from 'models/purchasePlaceValidations'
import type { purchase_places } from '@prisma/client'
import { response } from 'controllers/response'

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
    await prisma.purchase_places.create({
      data: {
        address,
        creation_date,
        name
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
  res: NextApiResponse<response<purchase_places[]>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<purchase_places[]>`SELECT 
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

export const updatePurchasePlace = async (
  req: CreatePurchasePlace,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { address, name, creation_date, id } = req.body
    purchasePlaceValidations({
      address, creationDate: creation_date as unknown as string, name
    })
    await prisma.$executeRaw`UPDATE IGNORE purchase_places SET
address = ${address},
name = ${name}
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

interface CreatePurchasePlace extends NextApiRequest {
  body: purchase_places
}
