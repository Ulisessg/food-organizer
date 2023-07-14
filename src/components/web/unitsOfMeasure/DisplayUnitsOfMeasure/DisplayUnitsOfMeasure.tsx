/* eslint-disable max-lines-per-function */
import React, { type FC } from 'react'
import { Table, Th } from 'd-system'
import { ModalUpdateDataContextProvider } from 'context/ModalUpdateDataContext'
import Rows from './Rows'
import TableContainer from 'components/web/common/TableContainer'

const DisplayUnitsOfMeasure: FC = () => <>
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
      <ModalUpdateDataContextProvider>
        <Rows />
      </ModalUpdateDataContextProvider>
    </tbody>
    </Table>
  </TableContainer>
  </>

export default DisplayUnitsOfMeasure
