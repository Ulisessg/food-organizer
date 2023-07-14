/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Table, Td, Th } from 'd-system'
import React, { type FC, Fragment } from 'react'
import { type RootState } from 'redux/store'
import TableContainer from 'components/web/common/TableContainer'
import { useSelector } from 'react-redux'

const DisplayIngredientsStock:
FC = () => {
  const ingredientsStockData = useSelector((state: RootState) => state.ingredientsStock)
  return (<TableContainer>
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
          ingredientsStockData.ingredientsStock.map(({
            comment,
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
                N/A
              </Td>

              <Td>
                <Button
                  colorMessage="info"
                  size="small"
                  text="Editar"
                />
              </Td>
            </tr>
            </Fragment>)
          }
      </tbody>
    </Table>
  </TableContainer>
  )
}

export default DisplayIngredientsStock
