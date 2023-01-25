/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { type FC, Fragment } from 'react'
import { Table, Td, Th } from 'd-system'
import EditTableButtons from 'components/common/EditTableButtons'
import type { GetIngredients } from 'controllers/food_organizer_crud/ingredientCRUD'
import TableContainer from 'components/common/TableContainer'
import styled from 'styled-components'

const onUpdate = (): void => {
  console.log('Update!')
}

const DisplayIngredients: FC<Props> = ({ ingredients }) => <TableContainer>
  <Table caption="Ingredientes">
    <thead>
      <tr>
        <Th>Ingrediente</Th>
        <Th>Imagen</Th>
        <Th>Comentario</Th>
        <Th>Unidad de medida</Th>
        <Th>Lugares de compra</Th>
        <Th>Acciones</Th>
      </tr>
    </thead>
    <tbody>
      {ingredients.map(({
        comment, ingredient_id, image,
        ingredient_name, uom_name,
        ingr_purchase_places
      }) => <Fragment key={ingredient_id}>
            <TrStyles className="table-content">
              <Td>{ingredient_name}</Td>
              <Td>
                {typeof image === 'string' && <img src={image} alt={`${ingredient_name} image`} />}
                {typeof image !== 'string' && <p>N/A</p>}
              </Td>
              { comment?.length as number > 0 && <Td>{comment}</Td>}
              { comment?.length === 0 && <Td>N/A</Td>}
              <Td>{uom_name}</Td>
              {/* Purchase places */}
              {ingr_purchase_places?.map(({
                ingredient_purchase_place_id,
                purchase_place_name
              }) => <Fragment key={ingredient_purchase_place_id}>
                  <Td
                  className="ingredient_purchase_places"
                  >{purchase_place_name}</Td>
                </Fragment>)}
                {!Array.isArray(ingr_purchase_places) && <Td>N/A</Td>}
                <EditTableButtons className="no_grid" onUpdate={onUpdate} />
            </TrStyles>
          </Fragment>)}
    </tbody>
  </Table>
</TableContainer>

const TrStyles = styled.tr`
.ingredient_purchase_places {
  display: flex;
  justify-content: center;
  &:not(:nth-last-child(2)) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.dark2};
  }
}
.no_grid {
  display: table-cell;
  margin: 10px;
  &[data-is-active=true] {
    & button {margin-top: 10px}
  }
}
`

interface Props {
  ingredients: GetIngredients
}

export default DisplayIngredients
