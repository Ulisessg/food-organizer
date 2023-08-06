/* eslint-disable max-lines-per-function */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { type FC } from 'react'
import { Table, Th } from 'd-system'
import { ModalUpdateDataContextProvider } from 'context/ModalUpdateDataContext'
import ModalUpdateIngredients from '../UpdateIngredients'
import Rows from './Rows'
import TableContainer from 'components/web/common/TableContainer'

const DisplayIngredients: FC = () => <TableContainer>
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
    <ModalUpdateDataContextProvider>
      <ModalUpdateIngredients />
      <Rows />
    </ModalUpdateDataContextProvider>
    </tbody>
  </Table>
</TableContainer>

export default DisplayIngredients
