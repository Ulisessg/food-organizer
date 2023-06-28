/* eslint-disable max-lines-per-function */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Table, Td, Th } from 'd-system'
import React, { type FC, Fragment } from 'react'
import { type RootState } from 'redux/store'
import TableContainer from 'components/web/common/TableContainer'
import randomId from 'utils/randomId'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const onUpdate = (): void => {
  console.log('Update!')
}

const DisplayIngredients: FC = () => {
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients)

  return <TableContainer>
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
                <img src={image} alt={`${ingredient_name} image`} />
              </Td>
              <Td>{comment ?? ''}</Td>
              <Td>{uom_name}</Td>
              {(() => {
                if (ingr_purchase_places.length >= 1) {
                  return ingr_purchase_places?.map((pp) => <Fragment key={randomId()}>
                  <Td
                    className={
                      (ingr_purchase_places.length > 1) && 'ingredient_purchase_places' as any}
                  >{pp.purchase_place_name}</Td>
                </Fragment>)
                }
                return <Td></Td>
              })()}
              {/* Purchase places */}
                <Td>
                  <Button
                    colorMessage="info"
                    size="small"
                    text="Editar"
                    onClick={onUpdate}
                  />
                </Td>
            </TrStyles>
          </Fragment>)}
    </tbody>
  </Table>
</TableContainer>
}

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

export default DisplayIngredients
