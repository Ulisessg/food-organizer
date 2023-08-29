/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { type FC, Fragment } from 'react'
import { Table, Td, Th } from 'd-system'
import { ButtonOpenModal } from 'components/web/common/ModalUpdateData'
import {
  ModalUpdateDataContextProvider
} from 'context/ModalUpdateDataContext'
import { type RootState } from 'redux/store'
import SystemImage from 'components/web/common/SystemImage'
import TableContainer from 'components/web/common/TableContainer'
import UpdateIngredientsStock from '../UpdateIngredientsStock/UpdateIngredientsStock'
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
      <ModalUpdateDataContextProvider>
        <UpdateIngredientsStock />
        {
          ingredientsStockData.ingredientsStock.map(({
            comment,
            ingredient,
            ingredient_id,
            ingredient_qty,
            uom,
            image
          }, ingredientStockIndex) => <Fragment key={ingredient_id}>
            <tr>
              <Td>
                {ingredient}
              </Td>
              <Td>
                {ingredient_qty} {uom}
              </Td>
              <Td>
                {comment ?? ''}
              </Td>
              <Td>
                <SystemImage
                  fileName={image ?? ''}
                  imageIsInTemporal={false}
                  table="ingredients"
                />
              </Td>
              <Td>
                <ButtonOpenModal
                  size="small"
                  text="Editar"
                  elementIndex={ingredientStockIndex}
                  groupingElementIndex={null}
                />
              </Td>
            </tr>
            </Fragment>)
          }
      </ModalUpdateDataContextProvider>
      </tbody>
    </Table>
  </TableContainer>
  )
}

export default DisplayIngredientsStock
