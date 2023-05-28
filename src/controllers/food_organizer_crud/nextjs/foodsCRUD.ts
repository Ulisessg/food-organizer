/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import foodValidations, { validations } from 'models/foodValidations'
import { type CreateFoodIngredients } from '../sql/foodIngredients/createFoodIngredientsSql'
import capitalize from 'utils/capitalize'
import { createFoodIngredient } from './foodIngredientsCRUD'
import type { foods } from '@prisma/client'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'

// Allow Count() in sql query
// eslint-disable-next-line func-names
(BigInt.prototype as any).toJSON = function () {
  return Number(this)
}

export const createFood = async (
  req: CreateFoodRequest,
  res: NextApiResponse<response<CreateFoodsResponse>>
): Promise<void> => {
  let createFoodResponse: CreateFoodsResponse = {
    errorCreatingFood: false,
    errorCreatingIngedients: false
  } as any
  // Food
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
    const createFoodResult = await prisma.foods.create({
      data: {
        creation_date,
        food_type_id,
        image,
        name: capitalize(name),
        preparation_time,
        score,
        used_counter
      }
    })
    createFoodResponse = { ...createFoodResponse, ...createFoodResult }
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: {
        errorCreatingFood: true
      } as any,
      error: true
    })
  }
  // Food ingredients
  try {
    const { ingredients } = req.body
    const createIngredientsData = ingredients.map((ingr) => ({
      ...ingr,
      creation_date: createFoodResponse.creation_date as unknown as any,
      food_id: createFoodResponse.id
    }))
    await createFoodIngredient(createIngredientsData)
    createFoodResponse = { ...createFoodResponse, ingredients: createIngredientsData }
    res.status(201).send({
      data: createFoodResponse,
      error: false
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      data: {
        errorCreatingIngedients: true
      } as any,
      error: true
    })
  }
}

export const getFoods = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<GetFoods | string>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<GetFoods>`SELECT
food_types.id AS food_type_id,
food_types.name AS food_type_name,
COUNT(foods.id) AS total_foods,
JSON_ARRAYAGG(JSON_OBJECT(
  'food_id', foods.id,
  'food_name', foods.name,
  'preparation_time', foods.preparation_time,
  'score', foods.score,
  'image', foods.image
)) AS foods
FROM food_types
JOIN foods ON foods.food_type_id = food_types.id
GROUP BY food_type_name
ORDER BY food_type_name
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
  req: UpdateFoodRequest,
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
name = ${capitalize(name)},
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

interface CreateFoodRequest extends NextApiRequest {
  body: CreateFood
}

interface UpdateFoodRequest extends NextApiRequest {
  body: foods
}

export interface CreateFood {
  name: string
  used_counter: number | null
  preparation_time: number
  score: number | null
  food_type_id: number
  image: string | null
  creation_date: string
  ingredients: Array<Omit<CreateFoodIngredients[0], 'creation_date' | 'food_id'>>
}

export type GetFoods = Array<{
  food_type_id: number
  food_type_name: string
  total_foods: number
  foods: Array<{
    image: string | null
    score: number
    food_id: number
    food_name: string
    preparation_time: number
  }>
}>

export interface CreateFoodsResponse extends foods {
  ingredients: Array<{
    ingredient_id: number
    ingredient_qty: number
  }>
  errorCreatingFood: boolean
  errorCreatingIngedients: boolean
}
