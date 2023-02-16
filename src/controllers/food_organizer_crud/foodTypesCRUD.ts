/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import capitalize from 'utils/capitalize'
import foodTypeValidations from 'models/foodTypeValidations'
import type { food_types } from '@prisma/client'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'

export const createFoodType = async (
  req: CreateFoodTypeRequest,
  res: NextApiResponse<response<food_types | string>>
): Promise<void> => {
  try {
    const { creation_date, name } = req.body
    foodTypeValidations({
      creationDate: creation_date as unknown as string,
      name
    })
    const result = await prisma.food_types.create({
      data: { creation_date, name: capitalize(name) }
    })
    res.status(201).send({
      data: result,
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
    const result = await prisma.$queryRaw<GetFoodTypes>`SELECT
food_types.id, food_types.name
FROM food_types
ORDER BY food_types.name ASC
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

export const updateFoodTypes = async (
  req: UpdateFoodTypeRequest,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { creation_date, name, id } = req.body
    foodTypeValidations({
      creationDate: creation_date as unknown as string,
      name
    })
    const result = await prisma.$executeRaw`UPDATE IGNORE food_types SET
name = ${capitalize(name)}
WHERE food_types.id = ${id}
`
    console.log(result)
    res.status(200).send({
      data: 'food type updated successful',
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

export interface CreateFoodType {
  name: string
  creation_date: string
}

export type GetFoodTypes = Array<{
  id: number
  name: string
}>
