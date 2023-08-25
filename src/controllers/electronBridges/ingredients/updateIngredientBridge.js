/* eslint-disable max-len */
/* eslint-disable padded-blocks */
const { updateIngredient } = require('../bridgesNames')
const openDb = require('../../db/electronOpenDb')
const { contextBridge } = require('electron')
const updateIngredientsSql = require('../../sql/ingredients/updateIngredientsSql')
const getIngredientsSql = require('../../sql/ingredients/getIngredientsSql')
const createIngredientPurchasePlacesSql =
  require('../../sql/ingredientPurchasePlaces/createIngredientPurchasePlacesSql')
const capitalize = require('../../../utils/capitalize')

const electronCopyImageFromTemp = require('../../../utils/electronCopyImageFromTemp')

const updateIngredientBridge = () => {

  /**
   * @param {import('../../../redux/slices/ingredientsSlice/types').UpdateIngredientParams'} ingredient
   * @returns {import('../../sql/ingredients/types').GetIngredients[0]}
   */
  const update = async (ingredient) => {
    const db = openDb()
    const updateIngredientTransaction = db.transaction(() => {
      // Update ingredient
      const capitalizedIngredientName = capitalize(ingredient.ingredient_name)
      db.prepare(updateIngredientsSql).run([
        capitalizedIngredientName,
        ingredient.uom_id,
        ingredient.image,
        ingredient.comment,
        ingredient.ingredient_id
      ])

      // Update ingredient purchase places

      db
        // eslint-disable-next-line max-len
        .prepare('DELETE FROM ingredient_purchase_places WHERE ingredient_purchase_places.ingredient_id = ?')
        .run([ingredient.ingredient_id])

      const ingredientPurchasePlaces = ingredient.ingr_purchase_places

      if (ingredientPurchasePlaces.length > 0) {
        const createIngredientPP = db.prepare(createIngredientPurchasePlacesSql(1))

        ingredientPurchasePlaces.forEach((purchasePlaceId) => {
          createIngredientPP.run([
            null,
            ingredient.ingredient_id,
            purchasePlaceId
          ])
        })
      }
    })

    updateIngredientTransaction()

    if (typeof ingredient.image === 'string') {
      await electronCopyImageFromTemp(
        'ingredients',
        ingredient.image
      )
    }

    const ingredientUpdated = db.prepare(getIngredientsSql('WHERE ingredients.id = ?'))
      .get(ingredient.ingredient_id)

    return {
      ...ingredientUpdated,
      ingr_purchase_places: JSON.parse(ingredientUpdated.ingr_purchase_places)
    }
  }
  contextBridge.exposeInMainWorld(
    updateIngredient,
    update
  )
}

module.exports = updateIngredientBridge
