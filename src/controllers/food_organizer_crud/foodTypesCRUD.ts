/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import foodTypeValidations from 'models/foodTypeValidations'
import type { food_types } from '@prisma/client'
import prisma from 'lib/prisma'
import { response } from 'controllers/response'

export const createFoodType = async (
  req: CreateFoodType,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { creation_date, name } = req.body
    foodTypeValidations({
      creationDate: creation_date as unknown as string,
      name
    })
    await prisma.food_types.create({
      data: { creation_date, name: name.toLowerCase() }
    })
    res.status(201).send({
      data: 'food type created successful',
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
  res: NextApiResponse<response<GetFoodTypes>>
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
  req: CreateFoodType,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { creation_date, name, id } = req.body
    foodTypeValidations({
      creationDate: creation_date as unknown as string,
      name
    })
    const result = await prisma.$executeRaw`UPDATE IGNORE food_types SET
name = ${name.toLowerCase()}
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

interface CreateFoodType extends NextApiRequest {
  body: food_types
}

export type GetFoodTypes = Array<{
  id: number
  name: string
}>
