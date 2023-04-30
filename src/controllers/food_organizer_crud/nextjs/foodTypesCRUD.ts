/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import createFoodTypeSql, { type CreateFoodType } from '../sql/foodTypes/createFoodTypeSql'
import getFoodTypesSql, { type GetFoodTypes } from '../sql/foodTypes/getFoodTypesSql'
import type { food_types } from '@prisma/client'
import { type response } from 'controllers/response'
import updateFoodTypeSql from '../sql/foodTypes/updateFoodTypeSql'

export const createFoodType = async (
  req: CreateFoodTypeRequest,
  res: NextApiResponse<response<food_types | string>>
): Promise<void> => {
  try {
    const foodTypeCreated = await createFoodTypeSql(req.body)

    res.status(201).send({
      data: foodTypeCreated,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error creating food type',
      error: true
    })
  }
}

export const getFoodTypes = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<GetFoodTypes | null>>
): Promise<void> => {
  try {
    const foodTypes = await getFoodTypesSql()

    res.status(200).send({
      data: foodTypes,
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

export const updateFoodTypes = async (
  req: UpdateFoodTypeRequest,
  res: NextApiResponse<response<food_types | string>>
): Promise<void> => {
  try {
    const foodTypeUpdated = await updateFoodTypeSql(req.body)
    res.status(200).send({
      data: foodTypeUpdated,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error updating food type',
      error: true
    })
  }
}

interface CreateFoodTypeRequest extends NextApiRequest {
  body: CreateFoodType
}

interface UpdateFoodTypeRequest extends NextApiRequest {
  body: food_types
}
