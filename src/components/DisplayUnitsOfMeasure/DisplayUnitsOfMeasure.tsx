/* eslint-disable max-lines-per-function */
import React, { type FC, Fragment } from 'react'
import { Table, Th } from 'd-system'
import { type RootState } from 'redux/store'
import Rows from './Rows'
import TableContainer from 'components/common/TableContainer'
import { useSelector } from 'react-redux'

const DisplayUnitsOfMeasure: FC = () => {
  const unitsOfMeasureData = useSelector((state: RootState) => state.unitsOfMeasure)
  return <TableContainer>
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
    {unitsOfMeasureData.uomGroupedByType.map((uomt) => <Fragment key={uomt.uomt_id}>
      {uomt.uom.map((uom, index) => <Fragment key={uom.id}>
        {index === 0 && <>
          <Rows
            uomAbbreviation={uom.abbreviation}
            uomName={uom.name}
            uomtName={uomt.uomt_name}
            rowSpan={uomt.uom.length} />
          </>
        }
        {index !== 0 && <>
          <Rows
            uomAbbreviation={uom.abbreviation}
            uomName={uom.name}
            uomtName={uomt.uomt_name}
            />
        </>
        }
      </Fragment>)}
    </Fragment>)}

      </tbody>
    </Table>
  </TableContainer>
}

export default DisplayUnitsOfMeasure
