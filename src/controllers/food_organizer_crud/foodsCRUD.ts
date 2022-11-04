/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import foodValidations, { validations } from 'models/foodValidations'
import type { foods } from '@prisma/client'
import prisma from 'lib/prisma'
import { response } from 'controllers/response'

export const createFood = async (
  req: CreateFood,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const {
      creation_date,
      food_type_id, image,
      name,
      preparation_time,
      score,
      used_counter
    } = req.body
    foodValidations({
      creationDate: creation_date as unknown as string,
      foodTypeId: food_type_id,
      image,
      name,
      preparationTime: preparation_time as unknown as any,
      score: score as unknown as number,
      usedCounter: used_counter as unknown as number
    })
    await prisma.foods.create({
      data: {
        creation_date,
        food_type_id,
        image,
        name,
        preparation_time,
        score,
        used_counter
      }
    })
    res.status(201).send({
      data: 'food created',
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error creating food',
      error: true
    })
  }
}

export const getFoods = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<foods[] | string>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<foods[]>`SELECT
foods.id, foods.name, foods.used_counter, foods.preparation_time,
foods.score,foods.food_type_id, foods.image,
food_types.name AS food_type_name
FROM foods
INNER JOIN food_types ON food_types.id = foods.food_type_id
`
    res.status(200).send({
      data: result,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error getting food',
      error: true
    })
  }
}

// eslint-disable-next-line max-statements
export const updateFood = async (
  req: CreateFood,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const {
      id,
      food_type_id,
      image,
      name,
      preparation_time,
      score,
      used_counter
    } = req.body
    validations.foodTypeId(food_type_id)
    validations.image(image)
    validations.name(name)
    validations.preparationTime(preparation_time)
    validations.score(score)
    validations.usedCounter(used_counter)
    const rowsAffected = await prisma.$executeRaw`UPDATE IGNORE foods SET
food_type_id = ${food_type_id},
image = ${image},
name = ${name},
preparation_time = ${preparation_time},
score = ${score},
used_counter = ${used_counter}
WHERE foods.id = ${id}`
    console.log(rowsAffected)
    res.status(200).send({
      data: 'food updated',
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error updating food',
      error: true
    })
  }
}

interface CreateFood extends NextApiRequest {
  body: foods
}
