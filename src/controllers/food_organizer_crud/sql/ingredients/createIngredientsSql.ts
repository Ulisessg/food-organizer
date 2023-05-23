/* eslint-disable @typescript-eslint/naming-convention */
import capitalize from 'utils/capitalize'
import ingredientValidations from 'models/ingredientValidations'
import { type ingredients } from '@prisma/client'
import prisma from 'lib/prisma'

const createingredientSql = async (ingredient:
CreateIngredient): Promise<CreateIngredientReturn> => {
  const { comment, creation_date, image, name, uomId } = ingredient
  ingredientValidations({
    comment,
    creationDate: creation_date as unknown as string,
    image,
    name,
    uomId
  })
  const ingredientCreated = await prisma.ingredients.create({
    data: {
      comment,
      creation_date,
      image,
      name: capitalize(name),
      uom_id: uomId
    }
  })
  const uom = await prisma.units_of_measure.findUniqueOrThrow({
    where: {
      id: ingredientCreated.uom_id
    }
  })

  const uomName = uom.name
  return {
    ...ingredientCreated,
    uomName
  }
}

export interface CreateIngredient {
  comment: string | null
  creation_date: string
  image: string | null
  name: string
  uomId: number
}

export interface CreateIngredientReturn extends ingredients {
  uomName: string
}

export default createingredientSql
