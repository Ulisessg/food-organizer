/* eslint-disable max-lines-per-function */
import React, { type FC } from 'react'
import { Table, Th } from 'd-system'
import { ModalContextProvider } from 'context/ModalContext'
import Rows from './Rows'
import TableContainer from 'components/web/common/TableContainer'

const DisplayUnitsOfMeasure: FC = () => <ModalContextProvider>
    <TableContainer>
  <Table caption="Unidades de medida">
    <thead>
      <tr>
        <Th>
          Tipo de unidad de medida
        </Th>
        <Th>
          Unidad de medida
        </Th>
        <Th>
          Abbreviacion
        </Th>
        <Th>
          Acciones
        </Th>
      </tr>
    </thead>
    <tbody>
      <Rows />
    </tbody>
    </Table>
  </TableContainer>
  </ModalContextProvider>

export default DisplayUnitsOfMeasure
