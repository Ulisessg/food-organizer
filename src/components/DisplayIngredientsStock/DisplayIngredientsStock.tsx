/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { type FC, Fragment } from 'react'
import { Table, Td, Th } from 'd-system'
import EditTableButtons from 'components/common/EditTableButtons'
import type { GetIngredientStock } from 'controllers/food_organizer_crud/ingredientStockCRUD'
import TableContainer from 'components/common/TableContainer'

const DisplayIngredientsStock:
FC<DisplayIngredientsStockProps> = ({ ingredients }) => (<TableContainer>
  <Table caption="Ingredientes disponibles">
    <thead>
      <tr>
        <Th>Ingrediente</Th>
        <Th>Cantidad</Th>
        <Th>Comentario</Th>
        <Th>Imagen</Th>
        <Th>Acciones</Th>
      </tr>
    </thead>
    <tbody>
      {
        ingredients.map(({
          comment,
          image,
          ingredient,
          ingredient_id,
          ingredient_qty,
          uom
        }) => <Fragment key={ingredient_id}>
          <tr>
            <Td>
              {ingredient}
            </Td>
            <Td>
              {ingredient_qty} {uom}
            </Td>
            <Td>
              {comment === null && 'N/A'}
              {comment !== null && comment}
            </Td>
            <Td>
              {image === null && 'N/A'}
              {image !== null && image}
            </Td>

            <EditTableButtons onUpdate={() => { console.log('Update') }
            } />
          </tr>
          </Fragment>)
        }
    </tbody>
  </Table>
</TableContainer>
)

interface DisplayIngredientsStockProps {
  ingredients: GetIngredientStock
}

export default DisplayIngredientsStock
