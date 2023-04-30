import { type CreateIngredient } from './createIngredientSql'
import capitalize from 'utils/capitalize'
import { type ingredients } from '@prisma/client'
import prisma from 'lib/prisma'
import { validations } from 'models/ingredientValidations'

const updateIngredientSql = async (ingredient: UpdateIngredient): Promise<ingredients> => {
  const { comment, image, name, uomId, id } = ingredient
  validations.comment(comment)
  validations.image(image)
  validations.name(name)
  validations.uomId(uomId)
  const ingredientUpdated = await prisma.ingredients.update({
    data: {
      comment, image, name: capitalize(name), uom_id: uomId
    },
    where: {
      id
    }
  })
  return ingredientUpdated
}

export interface UpdateIngredient extends CreateIngredient {
  id: number
}

export default updateIngredientSql
