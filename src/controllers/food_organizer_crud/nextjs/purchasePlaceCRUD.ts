/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import createPurchasePlaceSql,
{ type CreatePurchasePlace } from '../sql/purchasePlaces/createPurchasePlacesSql'
import getPurchasePlacesSql,
{ type GetPurchasePlaces } from '../sql/purchasePlaces/getPurchasePlacesSql'
import type { purchase_places } from '@prisma/client'
import { type response } from 'controllers/response'
import updatePurchasePlaceSql from '../sql/purchasePlaces/updatePurchasePlacesSql'

// eslint-disable-next-line max-statements
export const createPurchasePlace = async (
  req: CreatePurchasePlaceRequest,
  res: NextApiResponse<response<purchase_places | string>>
): Promise<void> => {
  try {
    const purchasePlaceCretionResult = await createPurchasePlaceSql(req.body)
    res.status(201).send({
      data: purchasePlaceCretionResult,
      error: false
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      data: 'error creating purchase place',
      error: true
    })
  }
}

export const getPurchasePlaces = async (
  req: NextApiRequest,
  res: NextApiResponse<response<GetPurchasePlaces | null>>
): Promise<void> => {
  try {
    const purchasePlaces = await getPurchasePlacesSql()
    res.status(200).send({
      data: purchasePlaces,
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
  req: UpdatePurchasePlaceRequest,
  res: NextApiResponse<response<purchase_places | string>>
): Promise<void> => {
  try {
    const purchasePlaceUpdated = await updatePurchasePlaceSql(req.body)
    res.status(200).send({
      data: purchasePlaceUpdated,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({ data: 'error updating purchase place', error: true })
  }
}

interface CreatePurchasePlaceRequest extends NextApiRequest {
  body: CreatePurchasePlace
}

interface UpdatePurchasePlaceRequest extends NextApiRequest {
  body: purchase_places
}
